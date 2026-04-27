// components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user } = useAuth();

  const menuItems = {
    admin: [
      { path: '/dashboard', icon: '📊', label: 'Dashboard' },
      { path: '/dashboard/productos', icon: '📦', label: 'Productos' },
      { path: '/dashboard/cotizaciones', icon: '📝', label: 'Cotizaciones' },
      { path: '/dashboard/boletas', icon: '🧾', label: 'Boletas' },
      { path: '/dashboard/usuarios', icon: '👥', label: 'Usuarios' },
      { path: '/dashboard/historial', icon: '📜', label: 'Historial' },
      { path: '/dashboard/metricas', icon: '📈', label: 'Métricas' }
    ],
    vendedor: [
      { path: '/dashboard', icon: '📊', label: 'Dashboard' },
      { path: '/dashboard/productos', icon: '📦', label: 'Productos' },
      { path: '/dashboard/cotizaciones', icon: '📝', label: 'Cotizaciones' },
      { path: '/dashboard/boletas', icon: '🧾', label: 'Boletas' },
      { path: '/dashboard/historial', icon: '📜', label: 'Historial' }
    ],
    cliente: [
      { path: '/dashboard', icon: '📊', label: 'Dashboard' },
      { path: '/dashboard/productos', icon: '📦', label: 'Productos' },
      { path: '/dashboard/mis-cotizaciones', icon: '📝', label: 'Mis Cotizaciones' },
      { path: '/dashboard/mis-boletas', icon: '🧾', label: 'Mis Boletas' },
      { path: '/dashboard/nueva-cotizacion', icon: '➕', label: 'Nueva Cotización' }
    ]
  };

  const items = menuItems[user?.rol] || menuItems.cliente;

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
      <aside className={`sidebar ${!isOpen ? 'closed' : ''}`}>
        <div className="sidebar-header">
          <h3>Menú</h3>
          <button className="sidebar-close" onClick={() => setIsOpen(false)}>×</button>
        </div>
        <nav className="sidebar-nav">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}