// services/historialService.js
import api from './api';

const historialService = {
  async getHistorial(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    const response = await api.get(`/historial?${params}`);
    return response.data;
  },

  async getVentas() {
    const response = await api.get('/historial/ventas');
    return response.data;
  },

  async getDashboard() {
    const response = await api.get('/historial/dashboard');
    return response.data;
  },

  async getHistorialEntidad(entidad, id) {
    const response = await api.get(`/historial/entidad/${entidad}/${id}`);
    return response.data;
  }
};

export default historialService;