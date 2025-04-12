import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const getSortedTasks = (priority) =>
    tasks.filter((task) => task.priority === priority);

  const renderTaskGroup = (priorityLabel, priorityClass) => {
    const groupTasks = getSortedTasks(priorityLabel);
    if (groupTasks.length === 0) return null;

    return (
      <div>
        <h3 className={`priority-label ${priorityClass}`}>{priorityLabel} Priority</h3>
        <ul className="task-list">
          {groupTasks.map((task) => (
            <li key={task.id} className={`task-item ${priorityClass}`}>
              <div>
                <strong>{task.text}</strong>
                {task.city && <div>City: {task.city}</div>}
                {task.weather && (
                  <div>
                    Temp: {task.weather.temp}°C, {task.weather.description}
                  </div>
                )}
                {task.weatherError && (
                  <div className="error">Weather Error: {task.weatherError}</div>
                )}
              </div>
              <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {renderTaskGroup('High', 'high')}
      {renderTaskGroup('Medium', 'medium')}
      {renderTaskGroup('Low', 'low')}
    </div>
  );
}

export default TaskList;
