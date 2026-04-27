// components/dashboard/RecentActivity.jsx
import './RecentActivity.css';

export default function RecentActivity({ activities }) {
  const getActivityIcon = (type) => {
    const icons = {
      CREATE: '➕',
      UPDATE: '✏️',
      DELETE: '❌',
      APPROVE: '✅',
      REJECT: '❌',
      CONFIRM: '✔️'
    };
    return icons[type] || '📌';
  };

  return (
    <div className="recent-activity">
      <h3>Actividad Reciente</h3>
      <div className="activity-list">
        {activities?.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{getActivityIcon(activity.accion)}</div>
              <div className="activity-details">
                <p className="activity-description">{activity.descripcion}</p>
                <span className="activity-time">
                  {new Date(activity.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-activity">No hay actividad reciente</p>
        )}
      </div>
    </div>
  );
}