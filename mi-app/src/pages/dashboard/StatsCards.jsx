// components/dashboard/StatsCards.jsx
import './StatsCards.css';

export default function StatsCards({ stats, userRole }) {
  const getCards = () => {
    const baseCards = [
      { title: 'Total Ventas', value: `$${stats.totalSales?.toLocaleString() || 0}`, icon: '💰', color: '#28a745' },
      { title: 'Productos Activos', value: stats.activeProducts || 0, icon: '📦', color: '#007bff' }
    ];

    if (userRole === 'admin') {
      return [
        ...baseCards,
        { title: 'Usuarios Activos', value: stats.activeUsers || 0, icon: '👥', color: '#17a2b8' },
        { title: 'Cotizaciones', value: stats.totalQuotations || 0, icon: '📝', color: '#ffc107' }
      ];
    }

    if (userRole === 'vendedor') {
      return [
        ...baseCards,
        { title: 'Mis Cotizaciones', value: stats.myQuotations || 0, icon: '📝', color: '#ffc107' },
        { title: 'Por Aprobar', value: stats.pendingApprovals || 0, icon: '⏳', color: '#fd7e14' }
      ];
    }

    return [
      ...baseCards,
      { title: 'Mis Cotizaciones', value: stats.myQuotations || 0, icon: '📝', color: '#ffc107' },
      { title: 'Compras Realizadas', value: stats.myPurchases || 0, icon: '✅', color: '#6f42c1' }
    ];
  };

  const cards = getCards();

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div key={index} className="stat-card" style={{ borderTopColor: card.color }}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-info">
            <h3>{card.title}</h3>
            <p className="stat-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}