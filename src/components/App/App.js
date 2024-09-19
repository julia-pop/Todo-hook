import { useState, useRef } from 'react';

import './App.css';
import TaskList from '../TaskList';
import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';

export default function App() {
  const timerId = useRef([]);
  const taskId = useRef(0); 

  function createTodoTask(description, timerInSec, created = Date.now()) {
    return {
      description,
      created,
      editing: false,
      active: true,
      id: taskId.current++,
      timerInSec,
      timerStarted: false,
    };
  }

  const [todoData, setTodoData] = useState([
    createTodoTask('Completed task', 60, new Date()),
    createTodoTask('Editing task', 60, new Date()),
    createTodoTask('Active task', 60, new Date()),
  ]);
  const [filter, setFilter] = useState('all');

  function tick(id) {
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id);
      if (index === -1) return prevTodoData;
  
      const oldItem = prevTodoData[index];
      if (oldItem.timerInSec <= 0) {
        clearInterval(timerId.current[index]);
        timerId.current[index] = null;
        return prevTodoData; 
      }
  
      const newItem = {
        ...oldItem,
        timerStarted: true,
        timerInSec: oldItem.timerInSec - 1,
      };
      const newArr = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];
  
      return newArr;
    });
  }

  const onPlayTimer = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    if (index === -1) return; 
  
    const oldItem = todoData[index];
  
    if (oldItem.timerStarted) {
      clearInterval(timerId.current[index]);
    }
  
    const newTimerId = setInterval(() => tick(id), 1000);
    timerId.current[index] = newTimerId;
  };
  
  const onPauseTimer = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    if (index === -1) return;
  
    const oldItemTodoData = todoData[index];
  
    if (oldItemTodoData.timerStarted) {
      clearInterval(timerId.current[index]);
  
      setTodoData((prevTodoData) => {
        const oldItem = prevTodoData[index];
        const newItem = { ...oldItem, timerStarted: false };
        const newArr = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];
  
        return newArr;
      });
    }

  };
  const deleteTask = (id) => {
    onPauseTimer(id);
  
    setTodoData((prevTodoData) => {

      const updatedTodoData = prevTodoData.filter((task) => task.id !== id);

      timerId.current = timerId.current.filter((_, index) => index !== prevTodoData.findIndex((task) => task.id === id));
  
      return updatedTodoData;
    });
  };

  const editTask = (id) => {
    const index = todoData.findIndex((el) => el.id === id);

    setTodoData((prevTodoData) => {
      const oldItem = prevTodoData[index];
      const newItem = { ...oldItem, editing: !oldItem.editing };

      const newArr = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];

      return newArr;
    });
  };

  const onToggleCompleted = (id) => {
    onPauseTimer(id);
    setTodoData((prevTodoData) => {
      const index = prevTodoData.findIndex((el) => el.id === id);
      const oldItem = prevTodoData[index];
      const newItem = { ...oldItem, active: !oldItem.active };
      const newArr = [...prevTodoData.slice(0, index), newItem, ...prevTodoData.slice(index + 1)];

      return newArr;
    });
  };

  const addTask = (description, timerInSec, created = Date.now()) => {
    const newItem = createTodoTask(description, timerInSec, created);

    setTodoData((prevTodoData) => {
      const newArr = [...prevTodoData, newItem];

      return newArr;
    });
  };

  const onClickFilters = (event) => {
    const filterValue = event.target.innerText.toLowerCase();
    const filtersList = document.querySelector('.filters');
    const filterItems = filtersList.querySelectorAll('button');

    for (const filterOfArr of filterItems) {
      filterOfArr.classList.remove('selected');
    }
    event.target.classList.add('selected');

    setFilter(filterValue);
  };

  const onClickClearCompleted = () => {
    const todoActiveArr = todoData.filter((el) => el.active);
    setTodoData(todoActiveArr);
  };

  const todoLeftCount = todoData.filter((el) => el.active).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addTask} />
      </header>
      <section className="main">
        <TaskList
          todoData={todoData}
          filter={filter}
          onEdit={editTask}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          onTaskAdded={addTask}
          onPlayTimer={onPlayTimer}
          onPauseTimer={onPauseTimer}
        />
        <Footer
          todoLeft={todoLeftCount}
          onClickFilters={onClickFilters}
          onClickClearCompleted={onClickClearCompleted}
        />
      </section>
    </section>
  );
}