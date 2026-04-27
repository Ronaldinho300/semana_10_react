// pages/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/layout/Layout';
import StatsCards from '../../components/dashboard/StatsCards';
import RecentActivity from '../../components/dashboard/RecentActivity';
import ProductsTable from '../../components/dashboard/ProductsTable';
import QuotationsTable from '../../components/dashboard/QuotationsTable';
import SalesChart from '../../components/dashboard/SalesChart';
import QuickActions from '../../components/dashboard/QuickActions';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useDashboardData } from '../../hooks/useDashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error, refreshData } = useDashboardData();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-state">Error: {error}</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <StatsCards stats={data.stats} userRole={user?.rol} />
            <div className="dashboard-grid">
              <div className="grid-item full-width">
                <SalesChart data={data.salesData} userRole={user?.rol} />
              </div>
              <div className="grid-item">
                <RecentActivity activities={data.recentActivities} />
              </div>
              <div className="grid-item">
                <QuickActions userRole={user?.rol} onAction={refreshData} />
              </div>
            </div>
          </>
        );
      case 'productos':
        return <ProductsTable products={data.products} userRole={user?.rol} onUpdate={refreshData} />;
      case 'cotizaciones':
        return <QuotationsTable quotations={data.quotations} userRole={user?.rol} onUpdate={refreshData} />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', visible: true },
    { id: 'productos', label: 'Productos', visible: ['admin', 'vendedor', 'cliente'].includes(user?.rol) },
    { id: 'cotizaciones', label: 'Cotizaciones', visible: true }
  ];

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Bienvenido, {user?.nombre}!</h1>
          <p>Panel de control - {user?.rol === 'admin' ? 'Administrador' : user?.rol === 'vendedor' ? 'Vendedor' : 'Cliente'}</p>
        </div>

        <div className="dashboard-tabs">
          {tabs.filter(tab => tab.visible).map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
}