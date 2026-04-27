// services/productoService.js
import api from './api';

const productoService = {
  async getProductos() {
    const response = await api.get('/productos');
    return response.data;
  },

  async getProducto(id) {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  async crearProducto(data) {
    const response = await api.post('/productos', data);
    return response.data;
  },

  async updateProducto(id, data) {
    const response = await api.put(`/productos/${id}`, data);
    return response.data;
  },

  async deleteProducto(id) {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },

  async getVersiones(id) {
    const response = await api.get(`/productos/${id}/versiones`);
    return response.data;
  }
};

export default productoService;