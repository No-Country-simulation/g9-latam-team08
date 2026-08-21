import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Target, FileText, Bell, Settings,
  Headset, Sun, Moon, Menu, X } from "lucide-react";
import logoFinanceAI from "../../assets/logo-financeai.svg";
import "./Nav.css";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Estados para guardar los datos del usuario logueado
  const [userName, setUserName] = useState("Usuario");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Lectura del localStorage al cargar el componente
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedPhoto = localStorage.getItem("userPhoto");

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
    if (storedPhoto) setUserPhoto(storedPhoto);
  }, []);

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

        <div className="sidebar-spacer"></div>

        {/* Zona 4: Perfil de Usuario */}
        <div className="sidebar-user">
          <img
            src={userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=f3f4f6&color=374151`}
            alt="Avatar del usuario"
            className="user-avatar"
          />
          <div className="user-info">
            <p className="user-name">{userName}</p>
            <p className="user-email">{userEmail}</p>
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
