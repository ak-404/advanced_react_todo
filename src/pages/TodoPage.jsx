import { useDispatch } from 'react-redux';
import { logout } from '../features/tasks/taskSlice';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="todo-page">
      <div className="todo-header">
        <h1 className="todo-title">My To-Do List</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default TodoPage;
