import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';

function App() {
  const isAuthenticated = useSelector((state) => state.tasks.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;