// hooks/useDashboardData.js
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import productoService from '../services/productoService';
import cotizacionService from '../services/cotizacionService';
import boletaService from '../services/boletaService';
import historialService from '../services/historialService';

export const useDashboardData = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    stats: {},
    products: [],
    quotations: [],
    salesData: [],
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const promises = {
        products: productoService.getProductos(),
        quotations: cotizacionService.getCotizaciones(),
        activities: historialService.getHistorial({ limit: 10 })
      };

      // Agregar datos específicos según el rol
      if (user?.rol === 'admin') {
        promises.dashboard = historialService.getDashboard();
      }

      const results = await Promise.all(Object.values(promises));
      const [products, quotations, activities, dashboard] = results;

      // Procesar estadísticas
      let stats = {};
      if (user?.rol === 'admin' && dashboard) {
        stats = {
          totalSales: dashboard.totalVentas || 0,
          activeProducts: products.filter(p => p.activo).length,
          activeUsers: dashboard.usuariosActivos || 0,
          totalQuotations: quotations.length
        };
      } else if (user?.rol === 'vendedor') {
        const myQuotations = quotations.filter(q => q.vendedor_id === user.id);
        stats = {
          totalSales: 0,
          activeProducts: products.filter(p => p.activo).length,
          myQuotations: myQuotations.length,
          pendingApprovals: myQuotations.filter(q => q.estado === 'pendiente').length
        };
      } else {
        const myQuotations = quotations.filter(q => q.cliente_id === user.id);
        stats = {
          totalSales: 0,
          activeProducts: products.filter(p => p.activo).length,
          myQuotations: myQuotations.length,
          myPurchases: myQuotations.filter(q => q.estado === 'completada').length
        };
      }

      setData({
        stats,
        products: products.slice(0, 10),
        quotations: quotations.slice(0, 10),
        salesData: await generateSalesData(),
        recentActivities: activities
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const generateSalesData = async () => {
    // Simular datos de ventas para el gráfico
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months.map(month => ({
      month,
      ventas: Math.floor(Math.random() * 10000) + 1000,
      cotizaciones: Math.floor(Math.random() * 50) + 10
    }));
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return { data, loading, error, refreshData: fetchData };
};