import { useState, useEffect, useRef } from 'react';

const useKeyPress = callback => {
  const savedCallback = useRef();
  const [keyPressed, setKeyPressed] = useState('');

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        savedCallback.current && savedCallback.current(key);
      }
    };

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      setKeyPressed(null);
    };
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [keyPressed]);

  return keyPressed;
};

export default useKeyPress;
