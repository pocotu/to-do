import { useState } from 'react'
import './App.css'
import TaskItem from './TaskItem'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState('')

  const handleAddTask = () => {
    const trimmedTask = newTask.trim()
    if (trimmedTask === '') {
      setError('La tarea no puede estar vacía.')
      return
    }
    const isDuplicate = tasks.some(
      (task) => task.text.trim().toLowerCase() === trimmedTask.toLowerCase()
    )
    if (isDuplicate) {
      setError('La tarea ya existe.')
      return
    }
    setTasks([...tasks, { 
      id: Date.now(), 
      text: trimmedTask,
      createdAt: new Date().toISOString()
    }])
    setNewTask('')
    setError('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <div className="app-container">
      <h1>To Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => { setNewTask(e.target.value); setError('') }}
          onKeyPress={handleKeyPress}
          placeholder="Ingresa una nueva tarea..."
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">
          Agregar
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {tasks.length > 0 && (
        <div className="task-counter">
          {tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}
        </div>
      )}
      <ul className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task.text}
            createdAt={task.createdAt}
            onDelete={handleDeleteTask}
            index={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default App

