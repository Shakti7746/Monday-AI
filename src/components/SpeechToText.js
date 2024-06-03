import React, { useState, useEffect } from 'react';
import { webkitSpeechRecognition } from 'webkit-speech-recognition';
// import { getUserMedia } from 'media-stream';

const SpeechToText = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const speechRecognition = new webkitSpeechRecognition();
    speechRecognition.lang = 'en-US';
    speechRecognition.maxResults = 10;

    speechRecognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    speechRecognition.onerror = event => {
      setError(event.error);
    };

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        speechRecognition.start();
        stream.getAudioTracks()[0].enabled = true;
      })
      .catch(error => {
        setError(error);
      });

    return () => {
      speechRecognition.stop();
    };
  }, []);

  return (
    <div>
      <h1>Speech to Text</h1>
      <p>Speak now:</p>
      <button onClick={() => speechRecognition.start()}>Start</button>
      <button onClick={() => speechRecognition.stop()}>Stop</button>
      <p>Transcript: {text}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default SpeechToText;