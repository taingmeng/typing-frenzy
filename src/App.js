import React, { useState } from 'react';
import logo from './logo.svg';
import useKeyPress from './hooks/useKeyPress';
import { generate } from './utils/words';
import { currentTime } from './utils/time';

import './App.css';

const initialWords = generate();

function App() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  useKeyPress(key => {
    if (!startTime) {
      setStartTime(currentTime());
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);

      if (incomingChars.charAt(0) === ' ') {
        setWordCount(wordCount + 1);
        const durationInMinutes = (currentTime() - startTime) / 60000.0;
        setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      }
    }

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2,
      ),
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Character">
          <span className="Character-out">
            {(leftPadding + outgoingChars).slice(-20)}
          </span>
          <span className="Character-current">{currentChar}</span>
          <span>{incomingChars.substr(0, 20)}</span>
        </p>
        <h3>
          WPM: {wpm} | ACC: {accuracy}%
        </h3>
        <span>
          <a
            className="App-link"
            href="https://medium.com/@taingmeng/create-typing-game-with-react-hooks-usekeypress-and-faker-28bbc7919820"
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </a>
          |
          <a
            className="App-link"
            href="https://github.com/taingmeng/typing-frenzy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
