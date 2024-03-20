import React, { useState, useEffect } from 'react';
import '../Styles/stopwatch.css';

const Stopwatch = () => {
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [laps, setLaps] = useState([]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const updateDisplay = () => {
    return formatTime(seconds);
  };

  const startStop = () => {
    if (isRunning) {
      clearInterval(timer);
    } else {
      setTimer(setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000));
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(timer);
    setSeconds(0);
    setLaps([]);
    setIsRunning(false);
  };

  const lap = () => {
    setLaps([...laps, formatTime(seconds)]);
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className="stopwatch">
      <div id="display">
        <div id='value'>
          {updateDisplay()}
        </div>
      </div>
      <div className='button'>
        <div>
          <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        </div>
        <div>
          <button onClick={reset}>Reset</button>
        </div>
        <div>
          <button onClick={lap}>Lap</button>
        </div>
      </div>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{lap}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
