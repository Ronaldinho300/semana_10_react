// components/layout/Navbar.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getRoleBadge = () => {
    const roleColors = {
      admin: 'badge-danger',
      vendedor: 'badge-warning',
      cliente: 'badge-success'
    };
    return roleColors[user?.rol] || 'badge-secondary';
  };

  return (
    <nav className="navbar">
      <button className="navbar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="navbar-brand">
        <h2>Sistema de Ventas</h2>
      </div>

      <div className="navbar-actions">
        <div className="user-menu" onClick={() => setShowMenu(!showMenu)}>
          <div className="user-avatar">
            {user?.nombre?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.nombre}</span>
            <span className={`user-role ${getRoleBadge()}`}>
              {user?.rol?.toUpperCase()}
            </span>
          </div>
          {showMenu && (
            <div className="user-dropdown">
              <button onClick={() => navigate('/perfil')}>
                Mi Perfil
              </button>
              <hr />
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}