import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, fetchWeather } from '../features/tasks/taskSlice';

const TaskInput = () => {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'Medium',
    isOutdoor: false,
    city: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAdd = () => {
    const { text, priority, isOutdoor, city } = formData;
    if (!text.trim()) return alert('Please enter a task.');
    if (isOutdoor && !city.trim()) return alert('City is required for outdoor tasks.');

    const taskId = Date.now();
    const task = {
      id: taskId,
      text,
      priority,
      city: isOutdoor ? city : '',
      weather: null,
    };

    dispatch(addTask(task));
    if (isOutdoor) dispatch(fetchWeather({ city, taskId }));

    setFormData({ text: '', priority: 'Medium', isOutdoor: false, city: '' });
  };

  return (
    <div className="task-input">
      <input
        type="text"
        name="text"
        placeholder="Enter your task"
        value={formData.text}
        onChange={handleChange}
      />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <div className="checkbox-container">
        <input
          type="checkbox"
          id="outdoor-checkbox"
          name="isOutdoor"
          checked={formData.isOutdoor}
          onChange={handleChange}
        />
        <label htmlFor="outdoor-checkbox">Is it an outdoor activity?</label>
      </div>

      {formData.isOutdoor && (
        <input
          type="text"
          name="city"
          placeholder="Enter city for weather info"
          value={formData.city}
          onChange={handleChange}
        />
      )}

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TaskInput;
