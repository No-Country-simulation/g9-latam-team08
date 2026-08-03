import {
  ChevronDown,
  CirclePlus,
  FileText,
  History,
  Home,
  Lightbulb,
  Settings,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

interface SidebarNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const navItems: SidebarNavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Nuevo análisis", to: "/analisis/nuevo", icon: CirclePlus },
  { label: "Transacciones", to: "/dashboard/transacciones", icon: FileText },
  { label: "Recomendaciones", to: "/dashboard/recomendaciones", icon: Lightbulb },
  { label: "Historial", to: "/dashboard/historial", icon: History },
  { label: "Configuración", to: "/dashboard/configuracion", icon: Settings },
];

interface SidebarProps {
  userName?: string;
  userEmail?: string;
}

function Sidebar({ userName = "Usuario", userEmail = "usuario@email.com" }: SidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <NavLink className="dashboard-sidebar__brand" to="/dashboard" aria-label="Ir al dashboard">
        <span className="dashboard-sidebar__brand-mark">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <span className="dashboard-sidebar__brand-text">
          FinanceAI
          <small>Salud financiera</small>
        </span>
      </NavLink>

      <nav className="dashboard-sidebar__nav" aria-label="Navegación del dashboard">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `dashboard-sidebar__link${isActive ? " dashboard-sidebar__link--active" : ""}`
            }
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button className="dashboard-sidebar__user" type="button">
        <span className="dashboard-sidebar__user-avatar" aria-hidden="true">
          <UserRound size={18} />
        </span>
        <span className="dashboard-sidebar__user-info">
          <strong>{userName}</strong>
          <small>{userEmail}</small>
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
    </aside>
  );
}

export default Sidebar;
