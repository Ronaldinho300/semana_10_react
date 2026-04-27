// pages/cotizaciones/CotizacionDetalle.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import cotizacionService from '../../services/cotizacionService';
import './Cotizaciones.css';

export default function CotizacionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cotizacion, setCotizacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, hasRole } = useAuth();
  
  const isVendedor = hasRole('vendedor');
  const isCliente = hasRole('cliente');

  useEffect(() => {
    fetchCotizacion();
  }, [id]);

  const fetchCotizacion = async () => {
    try {
      const data = await cotizacionService.getCotizacion(id);
      setCotizacion(data);
    } catch (err) {
      setError('Cotización no encontrada');
    } finally {
      setLoading(false);
    }
  };

  const handleTomar = async () => {
    try {
      await cotizacionService.tomarCotizacion(id);
      fetchCotizacion();
    } catch (err) {
      alert('Error al tomar la cotización');
    }
  };

  const handleAprobar = async () => {
    if (window.confirm('¿Aprobar esta cotización?')) {
      try {
        await cotizacionService.aprobarCotizacion(id);
        fetchCotizacion();
        alert('Cotización aprobada');
      } catch (err) {
        alert('Error al aprobar');
      }
    }
  };

  const handleRechazar = async () => {
    const motivo = prompt('Motivo del rechazo:');
    if (motivo) {
      try {
        await cotizacionService.rechazarCotizacion(id, motivo);
        fetchCotizacion();
      } catch (err) {
        alert('Error al rechazar');
      }
    }
  };

  if (loading) return <Layout><LoadingSpinner /></Layout>;
  if (error) return <Layout><div className="error-state">{error}</div></Layout>;

  return (
    <Layout>
      <div className="cotizacion-detalle">
        <div className="detalle-header">
          <Button variant="secondary" onClick={() => navigate('/dashboard/cotizaciones')}>
            ← Volver
          </Button>
          <h1>Cotización #{cotizacion.id}</h1>
          <span className={`status-badge ${getStatusBadge(cotizacion.estado)}`}>
            {getStatusText(cotizacion.estado)}
          </span>
        </div>

        <div className="detalle-info">
          <div className="info-section">
            <h3>Información General</h3>
            <p><strong>Cliente:</strong> {cotizacion.cliente_nombre}</p>
            <p><strong>Email:</strong> {cotizacion.cliente_email}</p>
            <p><strong>Fecha:</strong> {new Date(cotizacion.created_at).toLocaleString()}</p>
            {cotizacion.vendedor_nombre && (
              <p><strong>Vendedor:</strong> {cotizacion.vendedor_nombre}</p>
            )}
            {cotizacion.nota_cliente && (
              <p><strong>Nota del cliente:</strong> {cotizacion.nota_cliente}</p>
            )}
            {cotizacion.motivo_rechazo && (
              <p><strong>Motivo de rechazo:</strong> {cotizacion.motivo_rechazo}</p>
            )}
          </div>

          <div className="items-section">
            <h3>Productos</h3>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cotizacion.items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto_nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>${item.precio_unitario?.toLocaleString()}</td>
                    <td>${item.subtotal?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="total-label">Total:</td>
                  <td className="total-value">${cotizacion.total?.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {isVendedor && cotizacion.estado === 'pendiente' && (
            <div className="acciones-section">
              <Button onClick={handleTomar}>Tomar Cotización</Button>
            </div>
          )}
          
          {isVendedor && cotizacion.estado === 'revisando' && cotizacion.vendedor_id === user?.id && (
            <div className="acciones-section">
              <Button variant="success" onClick={handleAprobar}>Aprobar</Button>
              <Button variant="danger" onClick={handleRechazar}>Rechazar</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function getStatusBadge(estado) {
  const badges = {
    pendiente: 'badge-pending',
    revisando: 'badge-reviewing',
    aprobada: 'badge-approved',
    rechazada: 'badge-rejected',
    completada: 'badge-completed'
  };
  return badges[estado] || 'badge-pending';
}

function getStatusText(estado) {
  const texts = {
    pendiente: 'Pendiente',
    revisando: 'En revisión',
    aprobada: 'Aprobada',
    rechazada: 'Rechazada',
    completada: 'Completada'
  };
  return texts[estado] || estado;
}