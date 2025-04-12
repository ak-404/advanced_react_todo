import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      dispatch(login());
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username (e.g. admin)"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password (e.g. admin)"
        value={credentials.password}
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
