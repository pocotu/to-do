import { useState } from 'react'

function formatDate(date) {
  if (!date) return 'Sin fecha';
  const d = new Date(date)
  if (isNaN(d.getTime())) return 'Sin fecha';
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function TodoItem({ task, onDelete, onToggleComplete }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const getDaysRemaining = () => {
    const deadline = new Date(task.date)
    const today = new Date()
    const diffTime = deadline - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining()
  const isOverdue = daysRemaining < 0 && !task.completed

  return (
    <li 
      className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="task-content">
        <div className="task-main">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="task-checkbox"
          />
          <span className="task-text">{task.text}</span>
        </div>
        <div className="task-dates">
          <span className={`task-date ${isOverdue ? 'overdue' : ''}`}>
            {isOverdue ? 'Vencida' : `Vence en ${daysRemaining} días`}
          </span>
          <span className="task-created">Creada: {formatDate(task.createdAt)}</span>
        </div>
      </div>
      <div className="task-actions">
        {isHovered && !showConfirm && (
          <button 
            className="delete-button" 
            onClick={() => setShowConfirm(true)}
            aria-label="Eliminar tarea"
          >
            Eliminar
          </button>
        )}
        {showConfirm && (
          <div className="confirm-delete">
            <span>¿Eliminar?</span>
            <button 
              className="confirm-button confirm"
              onClick={() => onDelete(task.id)}
            >
              Sí
            </button>
            <button 
              className="confirm-button cancel"
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default TodoItem 