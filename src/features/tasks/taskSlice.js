import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  isAuthenticated: JSON.parse(localStorage.getItem('auth')) || false,
  status: 'idle',
  error: null,
};

export const fetchWeather = createAsyncThunk('tasks/fetchWeather', async ({ city, taskId }, { rejectWithValue }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return { taskId, weather: response.data };
  } catch (error) {
    return rejectWithValue({ taskId, message: error.response?.data?.message || 'Failed to fetch weather data' });
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    login: (state) => {
      state.isAuthenticated = true;
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      state.tasks = savedTasks;
      localStorage.setItem('auth', JSON.stringify(true));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('auth', JSON.stringify(false));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { taskId, weather } = action.payload;
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.weather = {
            temp: weather.main.temp,
            description: weather.weather[0].description,
          };
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
        state.status = 'succeeded';
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        const { taskId, message } = action.payload;
        const task = state.tasks.find(t => t.id === taskId);
        if (task) {
          task.weatherError = message;
        }
        state.status = 'failed';
        state.error = message;
      });
  },
});

export const { addTask, deleteTask, login, logout } = taskSlice.actions;
export default taskSlice.reducer;
