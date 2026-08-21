import { ChartPie, Home, List, UserRound, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./MobileTabBar.css";

interface TabBarItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const tabItems: TabBarItem[] = [
  { label: "Inicio", to: "/dashboard", icon: Home },
  { label: "Análisis", to: "/dashboard/analisis", icon: ChartPie },
  { label: "Transacciones", to: "/dashboard/transacciones", icon: List },
  { label: "Perfil", to: "/dashboard/perfil", icon: UserRound },
];

function MobileTabBar() {
  return (
    <nav className="dashboard-tabbar" aria-label="Navegación inferior">
      {tabItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          end={to === "/dashboard"}
          className={({ isActive }) =>
            `dashboard-tabbar__link${isActive ? " dashboard-tabbar__link--active" : ""}`
          }
        >
          <Icon size={22} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileTabBar;
