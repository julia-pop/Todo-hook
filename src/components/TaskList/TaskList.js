import Task from '../Task';
import './TaskList.css';

export default function TaskList(props) {
  const { todoData, filter, onEdit, onDeleted, 
    onToggleCompleted, onTaskAdded, inputTime,
    onPlayTimer, onPauseTimer } = props;
  let  elem = null;
  let todoArray = [];

  function taskTemplate() {
    elem = todoArray.map((item, index) => {
      const { id, ...itemProps } = item;

      return (
        <Task
          {...itemProps}
          key={item.id}
          id={item.id}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEdit={() => onEdit(id)}
          onTaskAdded={(text, time) => onTaskAdded(text, time)}
          inputTime={inputTime}
          onPlayTimer={() => onPlayTimer(id)}
          onPauseTimer={() => onPauseTimer(id)}
          index={index}
        />
      );
    });
  }

  if (filter === 'all') {
    todoArray = [...todoData];
    taskTemplate();
  }

  if (filter === 'active') {
    todoArray = todoData.filter((el) => el.active);
    taskTemplate();
  }

  if (filter === 'completed') {
    todoArray = todoData.filter((el) => !el.active);
    taskTemplate();
  }

  return <ul className="todo-list">{elem}</ul>;
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  filter: 'all',
};

TaskList.propTypes = {
  filter: (props, propName, componentName) => {
    const value = props[propName];

    if (value === 'all' || value === 'active' || value === 'completed') {
      return null;
    }
    return new Error(`${componentName}: False value ${propName}: ${value}`);
  },
};