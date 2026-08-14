import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Target, FileText, Bell, Settings,
    Headset, Sun,Moon,Menu,X} from "lucide-react";
import logoFinanceAI from "../../assets/logo-financeai.svg"; // Verifica que la ruta sea correcta
import "./Nav.css";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Estado simulado para el diseño

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app-layout">

      {/* --- BARRA SUPERIOR MÓVIL --- */}
      <header className="mobile-header">
        <img
          src={logoFinanceAI}
          alt="FinanceAI"
          className="mobile-logo"
        />
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </header>

      {/* Fondo oscuro cuando el menú está abierto en celular */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}

      {/* --- BARRA LATERAL (SIDEBAR) --- */}
      <aside className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>

        <div className="sidebar-brand">
          <img src={logoFinanceAI} alt="FinanceAI" />
          <button className="close-menu-btn" onClick={closeMenu}>
            <X size={20} />
          </button>
        </div>

        {/* Zona 2: Menú Principal */}
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className="nav-item" onClick={closeMenu}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/analisis/nuevo" className="nav-item" onClick={closeMenu}>
            <PlusCircle size={20} />
            <span>Nuevo Análisis</span>
          </NavLink>

          <NavLink to="/metas" className="nav-item" onClick={closeMenu}>
            <Target size={20} />
            <span>Metas</span>
          </NavLink>

          <NavLink to="/historial" className="nav-item" onClick={closeMenu}>
            <FileText size={20} />
            <span>Historial</span>
          </NavLink>
        </nav>

        <hr className="sidebar-divider" />

        {/* Zona 3: Menú Secundario */}
        <nav className="sidebar-nav">
          <NavLink to="/notificaciones" className="nav-item" onClick={closeMenu}>
            <Bell size={20} />
            <span>Notificaciones</span>
          </NavLink>

          <NavLink to="/configuraciones" className="nav-item" onClick={closeMenu}>
            <Settings size={20} />
            <span>Configuraciones</span>
          </NavLink>

          <NavLink to="/soporte" className="nav-item" onClick={closeMenu}>
            <Headset size={20} />
            <span>Soporte</span>
          </NavLink>
        </nav>

        {/* Este div vacío empuja el contenido de abajo hacia el final de la pantalla */}
        <div className="sidebar-spacer"></div>

        {/* Zona 4: Perfil de Usuario */}
        <div className="sidebar-user">
          <img
            src={`https://ui-avatars.com/api/?name=Juan+Manuel&background=f3f4f6&color=374151`}
            alt="Avatar"
            className="user-avatar"
          />
          <div className="user-info">
            <p className="user-name">Juan Manuel</p>
            <p className="user-email">juanmanuel@email.com</p>
          </div>
        </div>

        {/* Zona 5: Selector de Tema */}
        <div className="theme-switcher">
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <Sun size={16} /> Light
          </button>
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <Moon size={16} /> Dark
          </button>
        </div>

      </aside>

      {/* --- ÁREA DE CONTENIDO PRINCIPAL --- */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}
