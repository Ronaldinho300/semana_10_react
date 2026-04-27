@echo off
echo Creando estructura de carpetas React...

mkdir src
cd src

:: ─── PAGES ─────────────────────────────
mkdir pages
mkdir pages\auth
mkdir pages\dashboard
mkdir pages\dashboard\admin
mkdir pages\dashboard\vendedor
mkdir pages\dashboard\cliente
mkdir pages\productos
mkdir pages\cotizaciones
mkdir pages\boletas
mkdir pages\historial

:: ARCHIVOS PAGES
type nul > pages\auth\Login.jsx
type nul > pages\auth\Register.jsx
type nul > pages\auth\ForgotPassword.jsx

type nul > pages\dashboard\admin\AdminDashboard.jsx
type nul > pages\dashboard\vendedor\VendedorDashboard.jsx
type nul > pages\dashboard\cliente\ClienteDashboard.jsx
type nul > pages\dashboard\DashboardRouter.jsx

type nul > pages\productos\Productos.jsx
type nul > pages\productos\ProductoDetalle.jsx

type nul > pages\cotizaciones\Cotizaciones.jsx
type nul > pages\cotizaciones\CotizacionDetalle.jsx
type nul > pages\cotizaciones\NuevaCotizacion.jsx

type nul > pages\boletas\Boletas.jsx
type nul > pages\boletas\BoletaDetalle.jsx

type nul > pages\historial\Historial.jsx

:: ─── COMPONENTS ───────────────────────
mkdir components
mkdir components\auth
mkdir components\layout
mkdir components\guards
mkdir components\ui
mkdir components\tables

type nul > components\auth\AuthForm.jsx
type nul > components\auth\AuthLayout.jsx

type nul > components\layout\Navbar.jsx
type nul > components\layout\Sidebar.jsx
type nul > components\layout\Layout.jsx

type nul > components\guards\PrivateRoute.jsx
type nul > components\guards\RoleGuard.jsx

type nul > components\ui\Button.jsx
type nul > components\ui\Input.jsx
type nul > components\ui\Card.jsx

type nul > components\tables\TableProductos.jsx
type nul > components\tables\TableCotizaciones.jsx
type nul > components\tables\TableBoletas.jsx

:: ─── SERVICES ─────────────────────────
mkdir services

type nul > services\api.js
type nul > services\authService.js
type nul > services\productoService.js
type nul > services\cotizacionService.js
type nul > services\boletaService.js
type nul > services\historialService.js

:: ─── CONTEXT ──────────────────────────
mkdir context
type nul > context\AuthContext.jsx

:: ─── HOOKS ────────────────────────────
mkdir hooks
type nul > hooks\useAuth.js
type nul > hooks\useFetch.js
type nul > hooks\useRole.js

:: ─── ROUTES ───────────────────────────
mkdir routes
type nul > routes\AppRouter.jsx

:: ─── UTILS ────────────────────────────
mkdir utils
type nul > utils\token.js
type nul > utils\roles.js
type nul > utils\formatDate.js

:: ─── ROOT FILES ───────────────────────
type nul > App.jsx
type nul > main.jsx

cd ..

echo Estructura creada correctamente 🚀
pause