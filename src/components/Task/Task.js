import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';

import Timer from '../Timer';

export default function Task(props) {
  const {
    index,
    description,
    created,
    onDeleted,
    onEdit,
    onToggleCompleted,
    active,
    editing,
    timerInSec,
    onTaskAdded,
    onPlayTimer,
    onPauseTimer,
  } = props;

  const [inputValue, setInputValue] = useState(description);
  const [edited, setEdited] = useState(false);

  function onInputChange(event) {
    setInputValue(event.target.value);
  }

  function onSubmit(event) {
    if (inputValue !== description) {
      setEdited(true);
      event.preventDefault();
      onTaskAdded(inputValue, timerInSec, created);

      const editingTask = document.querySelectorAll('.task');
      if (editingTask[index]) {
        editingTask[index].classList.add('visually-hidden');
      }
    }
    onEdit();
  }

  const onKeyDownTask = (e) => {
    if (e.key === 'Escape') {
      onEdit();
      setInputValue(description);
    }
  };

  const onBlurTask = (e) => {
    e.preventDefault();
    onEdit();
    setInputValue(description);
  };

  let className = active ? 'active' : 'completed';

  className = edited ? 'visually-hidden' : className;

  const text = edited ? inputValue : description;

  const isPlayButtonDisabled = edited;

  const htmlSample = (
    <div className="view">
      <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={!active} />
      <label>
        <div className="timer-block">
          <span className="title">{text}</span>
          <Timer
            timerInSec={timerInSec}
            onPlayTimer={onPlayTimer}
            onPauseTimer={onPauseTimer}
            disabledButton={isPlayButtonDisabled}
          />
        </div>
        <span className="created">created {created ? formatDistanceToNow(created) : 'Non data'} ago</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );

  if (editing) {
    return (
      <li className="task editing">
        {htmlSample}
        <form className="new-todo-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={onInputChange}
            value={inputValue}
            autoFocus
            onKeyDown={onKeyDownTask}
            onBlur={onBlurTask}
          />
          <button type="submit"></button>
        </form>
      </li>
    );
  } else {
    return <li className={`task ${className}`}>{htmlSample}</li>;
  }
}