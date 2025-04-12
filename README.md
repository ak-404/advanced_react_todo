# Advanced React To-Do Application

This is a feature-rich To-Do application built with **React.js**, **Redux Toolkit**, and **Redux Thunk**, featuring:

- Task creation with priorities  
- Weather API integration for outdoor tasks  
- Mock authentication  
- Persistent local storage support  
- Responsive design  

---

## Live Demo

**[Live Site](https://advanced-react-todo-pied.vercel.app/login)**

---

## Features

### 1. Authentication
- Users must log in with the credentials:
  - **Username**: `admin`
  - **Password**: `admin`
- Auth state is managed with Redux and persisted in `localStorage`.

### 2. Add Tasks
- Input a task and select its priority: **High**, **Medium**, or **Low**.
- Mark if it's an **outdoor activity**. If so, you must enter a **city**.
- The app fetches **real-time weather** for that city using the **OpenWeatherMap API**.

### 3. Task List Display
- Tasks are grouped and displayed by priority:
  - **High** tasks in red
  - **Medium** tasks in orange
  - **Low** tasks in green
- Weather details are shown for outdoor tasks.
- Graceful error handling for failed API requests.

### 4. Persistence
- All tasks and login status are stored in `localStorage`.
- Data remains even after browser refresh or logout/login.

### 5. Responsive UI
- Mobile-first layout using **Flexbox**.
- Fully responsive across **mobile**, **tablet**, and **desktop**.

---

## Tech Stack

- React + Vite  
- Redux Toolkit  
- Redux Thunk  
- OpenWeatherMap API  
- CSS

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/ak-404/advanced_react_todo.git
cd advanced_react_todo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Key

Create a `.env` file in the root with the following:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
```
### 4. Run the app
```bash
npm run dev
```
Visit http://localhost:5173 in your browser.
