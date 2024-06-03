import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support speech synthesis.');
    }
  };

  return (
    <div>
      <textarea 
        value={text}
        onChange={handleTextChange}
        rows="5"
        cols="50"
        placeholder="Enter text to convert to speech"
      />
      <br />
      <button onClick={handleSpeak}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
