import './TasksFilter.css';

export default function TasksFilter({ onClickFilters }) {
  return (
    <ul className="filters" onClick={onClickFilters}>
      <li>
        <button className="selected">All</button>
      </li>
      <li>
        <button>Active</button>
      </li>
      <li>
        <button>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.defaultProps = {
  onClickFilters: () => {},
};