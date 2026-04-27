// services/boletaService.js
import api from './api';

const boletaService = {
  async getBoletas() {
    const response = await api.get('/boletas');
    return response.data;
  },

  async getBoleta(id) {
    const response = await api.get(`/boletas/${id}`);
    return response.data;
  },

  async confirmarBoleta(id) {
    const response = await api.put(`/boletas/${id}/confirmar`);
    return response.data;
  },

  async cancelarBoleta(id) {
    const response = await api.put(`/boletas/${id}/cancelar`);
    return response.data;
  }
};

export default boletaService;