function TaskItem({ task, createdAt, onDelete, index }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <li className="task-item">
      <div className="task-content">
        <span className="task-text">{task}</span>
        <span className="task-date">{formatDate(createdAt)}</span>
      </div>
      <button className="delete-button" onClick={() => onDelete(index)}>Eliminar</button>
    </li>
  );
}

export default TaskItem;


