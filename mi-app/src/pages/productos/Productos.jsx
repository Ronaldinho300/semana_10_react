// pages/productos/Productos.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import productoService from '../../services/productoService';
import './Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const isAdmin = hasRole('admin');
  const isVendedor = hasRole('vendedor');
  const canEdit = isAdmin || isVendedor;

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.getProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar este producto?')) {
      try {
        await productoService.deleteProducto(id);
        fetchProductos();
      } catch (err) {
        alert('Error al desactivar el producto');
      }
    }
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await productoService.updateProducto(editingProduct.id, {
        stock: editingProduct.stock,
        descripcion: editingProduct.descripcion,
        ...(isAdmin && { nombre: editingProduct.nombre, precio: editingProduct.precio })
      });
      setShowModal(false);
      fetchProductos();
    } catch (err) {
      alert('Error al actualizar el producto');
    }
  };

  const filteredProductos = productos.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Layout><LoadingSpinner /></Layout>;
  if (error) return <Layout><div className="error-state">{error}</div></Layout>;

  return (
    <Layout>
      <div className="productos-page">
        <div className="page-header">
          <h1>Productos</h1>
          {isAdmin && (
            <Button onClick={() => navigate('/dashboard/productos/nuevo')}>
              + Nuevo Producto
            </Button>
          )}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="productos-grid">
          {filteredProductos.map(producto => (
            <div key={producto.id} className="producto-card">
              <div className="producto-header">
                <h3>{producto.nombre}</h3>
                <span className={`producto-stock ${producto.stock <= 5 ? 'low-stock' : ''}`}>
                  Stock: {producto.stock}
                </span>
              </div>
              
              <p className="producto-descripcion">{producto.descripcion}</p>
              
              <div className="producto-precio">
                ${producto.precio?.toLocaleString()}
              </div>
              
              <div className="producto-actions">
                <Button 
                  variant="info" 
                  onClick={() => navigate(`/dashboard/productos/${producto.id}`)}
                >
                  Ver Detalle
                </Button>
                
                {canEdit && (
                  <>
                    <Button variant="warning" onClick={() => handleEdit(producto)}>
                      Editar
                    </Button>
                    {isAdmin && (
                      <Button variant="danger" onClick={() => handleDelete(producto.id)}>
                        Desactivar
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProductos.length === 0 && (
          <div className="no-results">No se encontraron productos</div>
        )}

        {/* Modal de Edición */}
        {showModal && editingProduct && (
          <div className="modal">
            <div className="modal-content">
              <h2>Editar Producto</h2>
              
              {isAdmin && (
                <>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={editingProduct.nombre}
                    onChange={(e) => setEditingProduct({...editingProduct, nombre: e.target.value})}
                    className="modal-input"
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={editingProduct.precio}
                    onChange={(e) => setEditingProduct({...editingProduct, precio: parseFloat(e.target.value)})}
                    className="modal-input"
                  />
                </>
              )}
              
              <textarea
                placeholder="Descripción"
                value={editingProduct.descripcion}
                onChange={(e) => setEditingProduct({...editingProduct, descripcion: e.target.value})}
                className="modal-input"
              />
              
              <input
                type="number"
                placeholder="Stock"
                value={editingProduct.stock}
                onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                className="modal-input"
              />
              
              <div className="modal-actions">
                <Button onClick={handleSaveEdit}>Guardar</Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}