// pages/cotizaciones/Cotizaciones.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import cotizacionService from '../../services/cotizacionService';
import './Cotizaciones.css';

export default function Cotizaciones() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todas');
  
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const isVendedor = hasRole('vendedor');
  const isCliente = hasRole('cliente');

  useEffect(() => {
    fetchCotizaciones();
  }, []);

  const fetchCotizaciones = async () => {
    try {
      const data = await cotizacionService.getCotizaciones();
      setCotizaciones(data);
    } catch (err) {
      setError(err.message || 'Error al cargar cotizaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleTomarCotizacion = async (id) => {
    try {
      await cotizacionService.tomarCotizacion(id);
      fetchCotizaciones();
      alert('Cotización tomada exitosamente');
    } catch (err) {
      alert('Error al tomar la cotización');
    }
  };

  const handleAprobarCotizacion = async (id) => {
    if (window.confirm('¿Aprobar esta cotización? Se generará una boleta.')) {
      try {
        await cotizacionService.aprobarCotizacion(id);
        fetchCotizaciones();
        alert('Cotización aprobada y boleta generada');
      } catch (err) {
        alert('Error al aprobar la cotización');
      }
    }
  };

  const handleRechazarCotizacion = async (id) => {
    const motivo = prompt('Motivo del rechazo:');
    if (motivo) {
      try {
        await cotizacionService.rechazarCotizacion(id, motivo);
        fetchCotizaciones();
        alert('Cotización rechazada');
      } catch (err) {
        alert('Error al rechazar la cotización');
      }
    }
  };

  const getStatusBadge = (estado) => {
    const badges = {
      pendiente: 'badge-pending',
      revisando: 'badge-reviewing',
      aprobada: 'badge-approved',
      rechazada: 'badge-rejected',
      completada: 'badge-completed'
    };
    return badges[estado] || 'badge-pending';
  };

  const getStatusText = (estado) => {
    const texts = {
      pendiente: 'Pendiente',
      revisando: 'En revisión',
      aprobada: 'Aprobada',
      rechazada: 'Rechazada',
      completada: 'Completada'
    };
    return texts[estado] || estado;
  };

  const filteredCotizaciones = cotizaciones.filter(c => {
    if (filter === 'todas') return true;
    return c.estado === filter;
  });

  if (loading) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout>
      <div className="cotizaciones-page">
        <div className="page-header">
          <h1>Cotizaciones</h1>
          {isCliente && (
            <Button onClick={() => navigate('/dashboard/nueva-cotizacion')}>
              + Nueva Cotización
            </Button>
          )}
        </div>

        <div className="filtros">
          <button 
            className={`filtro-btn ${filter === 'todas' ? 'active' : ''}`}
            onClick={() => setFilter('todas')}
          >
            Todas
          </button>
          <button 
            className={`filtro-btn ${filter === 'pendiente' ? 'active' : ''}`}
            onClick={() => setFilter('pendiente')}
          >
            Pendientes
          </button>
          <button 
            className={`filtro-btn ${filter === 'aprobada' ? 'active' : ''}`}
            onClick={() => setFilter('aprobada')}
          >
            Aprobadas
          </button>
          <button 
            className={`filtro-btn ${filter === 'rechazada' ? 'active' : ''}`}
            onClick={() => setFilter('rechazada')}
          >
            Rechazadas
          </button>
        </div>

        <div className="cotizaciones-table-container">
          <table className="cotizaciones-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCotizaciones.map(cotizacion => (
                <tr key={cotizacion.id}>
                  <td>#{cotizacion.id}</td>
                  <td>{cotizacion.cliente_nombre}</td>
                  <td>{new Date(cotizacion.created_at).toLocaleDateString()}</td>
                  <td>${cotizacion.total?.toLocaleString() || 0}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadge(cotizacion.estado)}`}>
                      {getStatusText(cotizacion.estado)}
                    </span>
                  </td>
                  <td className="acciones">
                    <Button 
                      variant="info" 
                      size="small"
                      onClick={() => navigate(`/dashboard/cotizaciones/${cotizacion.id}`)}
                    >
                      Ver
                    </Button>
                    
                    {isVendedor && cotizacion.estado === 'pendiente' && (
                      <Button 
                        variant="primary" 
                        size="small"
                        onClick={() => handleTomarCotizacion(cotizacion.id)}
                      >
                        Tomar
                      </Button>
                    )}
                    
                    {isVendedor && cotizacion.estado === 'revisando' && cotizacion.vendedor_id === user?.id && (
                      <>
                        <Button 
                          variant="success" 
                          size="small"
                          onClick={() => handleAprobarCotizacion(cotizacion.id)}
                        >
                          Aprobar
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small"
                          onClick={() => handleRechazarCotizacion(cotizacion.id)}
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCotizaciones.length === 0 && (
          <div className="no-results">No hay cotizaciones</div>
        )}
      </div>
    </Layout>
  );
}