import React from 'react';
import axios from 'axios';
import { useEffect,useRef } from 'react';
const SummaryScreen = ({ totalAttempts, totalElapsedTime, handlePlayAgain }) => {
  const timer = Math.floor(totalElapsedTime / 1000);
  const gameId = "10"
  const tries = totalAttempts;
  const status = true

  const sendData = async () => {
    const res = await axios.post('https://jwlgamesbackend.vercel.app/api/caretaker/sendgamedata', { gameId, tries, timer, status });
    console.log(res);
  }
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    sendData();
    }, []);
    return (
      <div className="summary-screen" style={{
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}>
        <h1 className="summary-heading" style={{ textAlign: 'center', fontFamily: 'fantasy' }}>Sentence Verification Global</h1>
        <h3 className="summary-heading" style={{ textAlign: 'center', fontFamily: 'sans-serif', textDecoration: 'UnderLine', fontWeight: 'bold' }}>Stats</h3>

        {/* <div className="summary-details" style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Total Attempts: {totalAttempts}</p>
        <p>Time Taken: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutes</p>
      </div> */}
        <h3>CONGRATULATIONS...!!</h3>
        <h3>YOU HAVE COMPLETED THE GAME</h3>

        <button onClick={handlePlayAgain} className="play-again-button">Play Again</button>
      </div>
    );
  };

  export default SummaryScreen;
