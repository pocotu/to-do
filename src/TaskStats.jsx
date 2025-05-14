function TaskStats({ tasks }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="task-stats">
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{pendingTasks}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{completionRate}%</span>
          <span className="stat-label">Progreso</span>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${completionRate}%` }}
        />
      </div>
    </div>
  )
}

export default TaskStats 