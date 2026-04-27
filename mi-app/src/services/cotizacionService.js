// services/cotizacionService.js
import api from './api';

const cotizacionService = {
  async getCotizaciones() {
    const response = await api.get('/cotizaciones');
    return response.data;
  },

  async getCotizacion(id) {
    const response = await api.get(`/cotizaciones/${id}`);
    return response.data;
  },

  async crearCotizacion(data) {
    const response = await api.post('/cotizaciones', data);
    return response.data;
  },

  async tomarCotizacion(id) {
    const response = await api.put(`/cotizaciones/${id}/tomar`);
    return response.data;
  },

  async aprobarCotizacion(id) {
    const response = await api.put(`/cotizaciones/${id}/aprobar`);
    return response.data;
  },

  async rechazarCotizacion(id, motivo) {
    const response = await api.put(`/cotizaciones/${id}/rechazar`, { motivo });
    return response.data;
  }
};

export default cotizacionService;