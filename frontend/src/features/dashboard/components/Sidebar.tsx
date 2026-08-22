import {
  CirclePlus,
  Headset,
  History,
  Home,
  Moon,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png";
import logoLight from "../../../assets/logo-light.png";
import type { ThemeMode } from "./useTheme";
import "./Sidebar.css";

interface SidebarNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const primaryNavItems: SidebarNavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Nuevo Análisis", to: "/analisis/nuevo", icon: CirclePlus },
  { label: "Historial", to: "/historial", icon: History },
];

const secondaryNavItems: SidebarNavItem[] = [
  { label: "Soporte", to: "/soporte", icon: Headset },
];

interface SidebarProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  userName?: string;
  userEmail?: string;
  userPhoto?: string | null;
}

function renderNavItems(items: SidebarNavItem[]) {
  return items.map(({ label, to, icon: Icon }) => (
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
  ));
}

function Sidebar({
  theme,
  onThemeChange,
  userName = "Usuario",
  userEmail = "",
  userPhoto = null,
}: SidebarProps) {
  const avatarUrl =
    userPhoto ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      userName,
    )}&background=f3f4f6&color=374151`;

  return (
    <aside className="dashboard-sidebar">
      <NavLink className="dashboard-sidebar__brand" to="/dashboard" aria-label="Ir al dashboard">
        <img
          className="dashboard-sidebar__brand-logo"
          src={theme === "dark" ? logoDark : logoLight}
          alt="FinanceAI - Salud Financiera"
        />
      </NavLink>

      <nav className="dashboard-sidebar__nav" aria-label="Navegación del dashboard">
        {renderNavItems(primaryNavItems)}

        <hr className="dashboard-sidebar__divider" />

        {renderNavItems(secondaryNavItems)}
      </nav>

      <hr className="dashboard-sidebar__divider" />

      <button className="dashboard-sidebar__user" type="button">
        <span className="dashboard-sidebar__user-avatar" aria-hidden="true">
          {userPhoto ? (
            <img src={avatarUrl} alt="" className="dashboard-sidebar__user-avatar-image" />
          ) : (
            <UserRound size={18} />
          )}
        </span>
        <span className="dashboard-sidebar__user-info">
          <strong>{userName}</strong>
          <small>{userEmail || "Sin email registrado"}</small>
        </span>
      </button>

      <div className="dashboard-sidebar__theme-toggle" role="radiogroup" aria-label="Tema de la aplicación">
        <button
          type="button"
          role="radio"
          aria-checked={theme === "light"}
          className={`dashboard-sidebar__theme-option${
            theme === "light" ? " dashboard-sidebar__theme-option--active" : ""
          }`}
          onClick={() => onThemeChange("light")}
        >
          <Sun size={16} aria-hidden="true" />
          Light
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={theme === "dark"}
          className={`dashboard-sidebar__theme-option${
            theme === "dark" ? " dashboard-sidebar__theme-option--active" : ""
          }`}
          onClick={() => onThemeChange("dark")}
        >
          <Moon size={16} aria-hidden="true" />
          Dark
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
