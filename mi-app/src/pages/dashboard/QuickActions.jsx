// components/dashboard/QuickActions.jsx
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './QuickActions.css';

export default function QuickActions({ userRole, onAction }) {
  const navigate = useNavigate();

  const actions = {
    admin: [
      { label: '➕ Nuevo Producto', action: () => navigate('/dashboard/productos/nuevo'), color: 'primary' },
      { label: '👥 Crear Usuario', action: () => navigate('/dashboard/usuarios/crear'), color: 'success' },
      { label: '📊 Ver Métricas', action: () => navigate('/dashboard/metricas'), color: 'info' }
    ],
    vendedor: [
      { label: '📦 Actualizar Stock', action: () => navigate('/dashboard/productos'), color: 'primary' },
      { label: '📝 Revisar Cotizaciones', action: () => navigate('/dashboard/cotizaciones'), color: 'warning' },
      { label: '✅ Procesar Ventas', action: () => navigate('/dashboard/boletas'), color: 'success' }
    ],
    cliente: [
      { label: '🛒 Nueva Cotización', action: () => navigate('/dashboard/nueva-cotizacion'), color: 'primary' },
      { label: '📋 Mis Cotizaciones', action: () => navigate('/dashboard/mis-cotizaciones'), color: 'info' },
      { label: '🧾 Mis Boletas', action: () => navigate('/dashboard/mis-boletas'), color: 'success' }
    ]
  };

  const quickActions = actions[userRole] || actions.cliente;

  return (
    <div className="quick-actions">
      <h3>Acciones Rápidas</h3>
      <div className="actions-buttons">
        {quickActions.map((action, index) => (
          <Button key={index} onClick={action.action} variant={action.color}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}