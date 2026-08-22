import { ChartPie, Headset, Home, List, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./MobileTabBar.css";

interface TabBarItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const tabItems: TabBarItem[] = [
  { label: "Inicio", to: "/dashboard", icon: Home },
  { label: "Análisis", to: "/analisis/nuevo", icon: ChartPie },
  { label: "Historial", to: "/historial", icon: List },
  { label: "Soporte", to: "/soporte", icon: Headset },
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
