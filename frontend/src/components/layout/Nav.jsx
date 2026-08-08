import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ArrowRightLeft, User, LogOut, Sparkles, Menu, X } from "lucide-react";
import "./Nav.css"; // Actualizamos la importación del CSS

export default function Nav() { // Renombramos el componente
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app-layout">

      {/* --- BARRA SUPERIOR MÓVIL --- */}
      <header className="mobile-header">
        <div className="brand">
          <span className="brand-mark">
            <Sparkles size={20} />
          </span>
          <span className="brand-name">FinanceAI</span>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* --- FONDO OSCURO (Overlay) PARA MÓVIL --- */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}

      {/* --- MENÚ LATERAL --- */}
      <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <span className="brand-mark">
              <Sparkles size={20} />
            </span>
            <span className="brand-name">FinanceAI</span>
          </div>
          <button
            className="close-menu-btn"
            onClick={closeMenu}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <LayoutDashboard size={20} />
            <span>Resumen</span>
          </Link>

          <Link
            to="/historial"
            className={`nav-item ${location.pathname === '/historial' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <ArrowRightLeft size={20} />
            <span>Historial</span>
          </Link>

          <Link
            to="/perfil"
            className={`nav-item ${location.pathname === '/perfil' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <User size={20} />
            <span>Mi Perfil</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-item btn-logout">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
