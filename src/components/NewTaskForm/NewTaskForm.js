import React, { useState } from 'react';
import './NewTaskForm.css';

export default function NewTaskForm({ onTaskAdded }) {
  const [inputValue, setInputValue] = useState('');
  const [inputMinuteValue, setInputMinuteValue] = useState(null);
  const [inputSecondValue, setInputSecondValue] = useState(null);

  const placeholder = 'What needs to be done?';

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onInputChangeMinInForm = (event) => {
    setInputMinuteValue(Number(event.target.value));
  };

  const onInputChangeSecInForm = (event) => {
    setInputSecondValue(Number(event.target.value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
    const inputTimeInSec = (inputMinuteValue * 60) + inputSecondValue;

    if (inputValue && inputTimeInSec > 0) {
      onTaskAdded(inputValue, inputTimeInSec);
      setInputValue('');
      setInputMinuteValue('');
      setInputSecondValue('');
    }
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input 
        className="new-todo" 
        placeholder={placeholder} 
        autoFocus 
        onChange={onInputChange} 
        value={inputValue} 
      />
      <input 
        className="new-todo-form__timer" 
        placeholder="Min" 
        onChange={onInputChangeMinInForm} 
        type="number" 
        value={inputMinuteValue} 
      />
      <input 
        className="new-todo-form__timer" 
        placeholder="Sec" 
        onChange={onInputChangeSecInForm} 
        type="number" 
        value={inputSecondValue} 
      />
      <button type="submit"></button>
    </form>
  );
}