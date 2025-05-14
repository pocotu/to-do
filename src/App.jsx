import { useState } from 'react'
import './App.css'
import TodoItem from './TodoItem'
import TaskForm from './TaskForm'
import TaskStats from './TaskStats'
import AnimatedBackground from './components/AnimatedBackground'

function TodoApp() {
  const [tasks, setTasks] = useState([])

  const handleAddTask = ({ text, date }) => {
    if (tasks.some(task => task.text === text)) {
      return false
    }
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        completed: false,
        date,
        createdAt: new Date().toISOString()
      }
    ])
    return true
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <>
      <AnimatedBackground />
      <div className="app-container">
        <div className="app-header">
          <h1>TO-DO</h1>
          <div className="developer-info">
            <span>Hecho por: Rossbel Huaylla Huillca</span>
            <span>Código: 183067</span>
          </div>
        </div>
        <TaskForm onAddTask={handleAddTask} />
        {tasks.length > 0 && (
          <>
            <TaskStats tasks={tasks} />
            <div className="task-list">
              {tasks.map(task => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleTask}
                />
              ))}
            </div>
          </>
        )}
        {tasks.length === 0 && (
          <div className="empty-state">
            <p>No hay tareas pendientes</p>
            <p className="empty-state-subtitle">¡Agrega una nueva tarea para comenzar!</p>
          </div>
        )}
      </div>
    </>
  )
}

export default TodoApp

