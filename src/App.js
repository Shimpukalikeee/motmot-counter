import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [startDate, setStartDate] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    anniversaries: 0
  });
  const [totalTime, setTotalTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
    anniversaries: 0
  });

  // Calculate time differences
  const calculateTimeElapsed = (start) => {
    const now = new Date();
    const startTime = new Date(start);
    const diffInMs = now - startTime;
    
    if (diffInMs < 0) return null;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    

    const months = Math.floor(days / 30.44);
    

    const anniversaries = Math.floor(days / 365.25);

    const elapsed = {
      seconds: seconds % 60,
      minutes: minutes % 60,
      hours: hours % 24,
      days: days % 7,
      weeks: weeks % 4,
      months: months % 12,
      anniversaries: anniversaries
    };

    const total = {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
      weeks: weeks,
      months: months,
      anniversaries: anniversaries
    };

    return { elapsed, total };
  };


  useEffect(() => {
    if (!startDate) return;

    const interval = setInterval(() => {
      const result = calculateTimeElapsed(startDate);
      if (result) {
        setTimeElapsed(result.elapsed);
        setTotalTime(result.total);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);


  useEffect(() => {
    if (startDate) {
      const result = calculateTimeElapsed(startDate);
      if (result) {
        setTimeElapsed(result.elapsed);
        setTotalTime(result.total);
      }
    }
  }, [startDate]);

  const handleDateChange = (e) => {
    setStartDate(e.target.value);
    setSelectedUnit(null);
  };

  const handleUnitClick = (unit) => {
    setSelectedUnit(selectedUnit === unit ? null : unit);
  };


  const isLargeNumber = (num) => {
    return num >= 1000 || (num >= 100 && selectedUnit);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">💕 Motmot Counter 💕</h1>
          <p className="subtitle">Track your beautiful journey together</p>
        </header>

        <div className="date-input-section">
          <label htmlFor="start-date" className="date-label">
            When did you start dating?
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleDateChange}
            max={getCurrentDate()}
            className="date-input"
          />
        </div>

        {startDate && (
          <div className="counter-section">
            <div className="time-display">
              <div 
                className={`time-unit ${selectedUnit === 'anniversaries' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('anniversaries')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'anniversaries' ? totalTime.anniversaries : timeElapsed.anniversaries) ? 'large-number' : ''}`}>
                  {selectedUnit === 'anniversaries' ? totalTime.anniversaries : timeElapsed.anniversaries}
                </span>
                <span className="label">
                  Anniversary{selectedUnit === 'anniversaries' ? (totalTime.anniversaries !== 1 ? 'ies' : 'y') : (timeElapsed.anniversaries !== 1 ? 'ies' : 'y')}
                </span>
                {selectedUnit === 'anniversaries' && <div className="total-indicator">Total</div>}
              </div>
              <div 
                className={`time-unit ${selectedUnit === 'months' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('months')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'months' ? totalTime.months : timeElapsed.months) ? 'large-number' : ''}`}>
                  {selectedUnit === 'months' ? totalTime.months : timeElapsed.months}
                </span>
                <span className="label">
                  Month{selectedUnit === 'months' ? (totalTime.months !== 1 ? 's' : '') : (timeElapsed.months !== 1 ? 's' : '')}
                </span>
                {selectedUnit === 'months' && <div className="total-indicator">Total</div>}
              </div>
              <div 
                className={`time-unit ${selectedUnit === 'weeks' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('weeks')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'weeks' ? totalTime.weeks : timeElapsed.weeks) ? 'large-number' : ''}`}>
                  {selectedUnit === 'weeks' ? totalTime.weeks : timeElapsed.weeks}
                </span>
                <span className="label">
                  Week{selectedUnit === 'weeks' ? (totalTime.weeks !== 1 ? 's' : '') : (timeElapsed.weeks !== 1 ? 's' : '')}
                </span>
                {selectedUnit === 'weeks' && <div className="total-indicator">Total</div>}
              </div>
              <div 
                className={`time-unit ${selectedUnit === 'days' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('days')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'days' ? totalTime.days : timeElapsed.days) ? 'large-number' : ''}`}>
                  {selectedUnit === 'days' ? totalTime.days : timeElapsed.days}
                </span>
                <span className="label">
                  Day{selectedUnit === 'days' ? (totalTime.days !== 1 ? 's' : '') : (timeElapsed.days !== 1 ? 's' : '')}
                </span>
                {selectedUnit === 'days' && <div className="total-indicator">Total</div>}
              </div>
              <div 
                className={`time-unit ${selectedUnit === 'hours' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('hours')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'hours' ? totalTime.hours : timeElapsed.hours) ? 'large-number' : ''}`}>
                  {selectedUnit === 'hours' ? totalTime.hours : timeElapsed.hours}
                </span>
                <span className="label">
                  Hour{selectedUnit === 'hours' ? (totalTime.hours !== 1 ? 's' : '') : (timeElapsed.hours !== 1 ? 's' : '')}
                </span>
                {selectedUnit === 'hours' && <div className="total-indicator">Total</div>}
              </div>
              <div 
                className={`time-unit ${selectedUnit === 'minutes' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('minutes')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'minutes' ? totalTime.minutes : timeElapsed.minutes) ? 'large-number' : ''}`}>
                  {selectedUnit === 'minutes' ? totalTime.minutes : timeElapsed.minutes}
                </span>
                <span className="label">
                  Minute{selectedUnit === 'minutes' ? (totalTime.minutes !== 1 ? 's' : '') : (timeElapsed.minutes !== 1 ? 's' : '')}
                </span>
                {selectedUnit === 'minutes' && <div className="total-indicator">Total</div>}
              </div>
              <div 
                className={`time-unit ${selectedUnit === 'seconds' ? 'selected' : ''}`}
                onClick={() => handleUnitClick('seconds')}
              >
                <span className={`number ${isLargeNumber(selectedUnit === 'seconds' ? totalTime.seconds : timeElapsed.seconds) ? 'large-number' : ''}`}>
                  {selectedUnit === 'seconds' ? totalTime.seconds : timeElapsed.seconds}
                </span>
                <span className="label">
                  Second{selectedUnit === 'seconds' ? (totalTime.seconds !== 1 ? 's' : '') : (timeElapsed.seconds !== 1 ? 's' : '')}
                </span>
                {selectedUnit === 'seconds' && <div className="total-indicator">Total</div>}
              </div>
            </div>
            
            <div className="love-message">
              <p>Every moment with you is precious! 💖</p>
            </div>
            
            <div className="click-instruction">
              <p>💡 Click on any time unit to see the total accumulated time!</p>
            </div>
          </div>
        )}

        {!startDate && (
          <div className="welcome-message">
            <p>Choose your special date to start counting your beautiful journey together! 🌟</p>
          </div>
        )}

        <div className="floating-hearts">
          <div className="heart">💖</div>
          <div className="heart">💕</div>
          <div className="heart">💗</div>
          <div className="heart">💝</div>
          <div className="heart">💘</div>
        </div>
      </div>
    </div>
  );
}

export default App;
