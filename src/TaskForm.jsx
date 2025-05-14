import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [error, setError] = useState('')

  const validateTask = () => {
    const trimmedTask = newTask.trim()
    const selectedDate = new Date(taskDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (trimmedTask === '') {
      setError('La tarea no puede estar vacía.')
      return false
    }

    if (!taskDate) {
      setError('Debes seleccionar una fecha.')
      return false
    }

    if (selectedDate < today) {
      setError('No puedes seleccionar una fecha anterior a hoy.')
      return false
    }

    return true
  }

  const handleSubmit = () => {
    if (!validateTask()) return

    onAddTask({
      text: newTask.trim(),
      date: taskDate
    })

    setNewTask('')
    setTaskDate('')
    setError('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="input-container">
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => { setNewTask(e.target.value); setError('') }}
          onKeyPress={handleKeyPress}
          placeholder="Ingresa una nueva tarea..."
          className="task-input"
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => { setTaskDate(e.target.value); setError('') }}
          className="date-input"
        />
        <button onClick={handleSubmit} className="add-button">
          Agregar
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default TaskForm 