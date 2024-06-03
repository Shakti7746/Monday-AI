import React, { useState, useEffect, useRef } from 'react';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      console.log(interimTranscript); // For debugging
    };

    recognitionRef.current = recognition;
  }, []);

  const handleStartListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div>
      <button onClick={handleStartListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={handleStopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
