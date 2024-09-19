import React from 'react';

export default function Timer(props) {
  const { timerInSec, onPlayTimer, onPauseTimer, disabledButton } = props;

  const mins = Math.floor(timerInSec / 60);
  const secs = timerInSec - mins * 60;
  const timerShow = timerInSec > 0 ? `${mins} : ${secs}` : `Time's up`;

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onPlayTimer} disabled={disabledButton}></button>
      <button className="icon icon-pause" onClick={onPauseTimer} disabled={disabledButton}></button>
      <span className="timer">{timerShow}</span>
    </span>
  );
}