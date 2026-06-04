import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState(5);
  const [numbers, setNumbers] = useState([]);
  const [expectedNumber, setExpectedNumber] = useState(1);
  const [status, setStatus] = useState('ready');
  const [timer, setTimer] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const startGame = () => {
    const count = points;

    const generatedNumbers = [];
    for (let i = count; i >= 1; i--) {
      generatedNumbers.push({ value: i, top: Math.random() * 350, left: Math.random() * 350, selected: false, countdown: 3 });
    }
    setNumbers(generatedNumbers);
    setExpectedNumber(1);
    setStatus('playing');
    setTimer(0);
    setAutoPlay(false);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers((prevNumbers) => prevNumbers
        .map((num) => {
          if (num.selected)
            return { ...num, countdown: +(num.countdown - 0.1).toFixed(1) };
          return num;
        })
        .filter(num => !num.selected || num.countdown > 0)
      );

    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (status === 'playing') {
      timer = setInterval(() => {
        setTimer((prev) => +(prev + 0.1).toFixed(1));
      }, 100);
    }
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (
      status === "playing" &&
      numbers.length === 0
    ) {
      setStatus("won");
    }
  }, [numbers, status]);

  const handleNumberClick = useCallback((number) => {
    if (status !== 'playing') return;

    if (autoPlay && number !== expectedNumber) {
      return;
    }

    if (number === expectedNumber) {
      setNumbers(numbers =>
        numbers.map(n =>
          n.value === number
            ? { ...n, selected: true }
            : n
        )
      );

      if (expectedNumber < points) {
        setExpectedNumber(prev => prev + 1);
      }
    } else {
      setStatus('lost');
    }
  }, [status, autoPlay, expectedNumber, points]);

  useEffect(() => {
    if (!autoPlay || status !== "playing") return;

    const interval = setInterval(() => {
      handleNumberClick(expectedNumber);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoPlay, expectedNumber, status, handleNumberClick]);


  return (
    <div className="Container">
      {status === 'ready' && <h1>LET'S PLAY!</h1>}
      {status === 'playing' && <h1>LET'S PLAY!</h1>}
      {status === 'won' && <h1 style={{ color: "green" }}>ALL CLEARED </h1>}
      {status === 'lost' && <h1 style={{ color: "red" }}>GAME OVER </h1>}
      <div className="Controls">
        <label>Points: </label>
        <input type="number" min="1" value={points} onChange={(e) => setPoints(parseInt(e.target.value))} />
        <div><label>Time: </label>{timer.toFixed(1)}s</div>

        <button className="play-btn" onClick={startGame}>
          {status === "ready" ? "Play" : "Restart"}
        </button>
        {status === 'playing' && (
          <button
            className="autoplaybtn"
            onClick={() => setAutoPlay(prev => !prev)}
          >
            {autoPlay ? "Auto Play: OFF" : "Auto Play: ON"}
          </button>
        )}
      </div>
      <div className="Board">
        {numbers.map((number) => (
          <button
            key={number.value}
            className={`number ${number.selected ? 'selected' : ''}`}
            onClick={() => handleNumberClick(number.value)}
            style={{ position: 'absolute', top: number.top, left: number.left }}
          >
            <div>{number.value}</div>
            {number.selected &&
              <div className="countdown">
                {number.countdown.toFixed(1)}s
              </div>}
          </button>
        ))}
      </div>
      {status === 'playing' && <h2>Next:{expectedNumber}</h2>}
    </div>

  );
}

export default App;
