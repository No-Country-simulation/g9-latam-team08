import { Bell, CalendarDays, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import BrandMark from "./BrandMark";
import "./Topbar.css";

interface TopbarProps {
  lastAnalysisDate: string;
  hasNotifications?: boolean;
}

function Topbar({ lastAnalysisDate, hasNotifications = false }: TopbarProps) {
  return (
    <header className="dashboard-topbar">
      <Link className="dashboard-topbar__brand" to="/dashboard" aria-label="Ir al dashboard">
        <BrandMark size={22} />
        <span>FinanceAI</span>
      </Link>

      <div className="dashboard-topbar__meta">
        <span className="dashboard-topbar__date">
          <CalendarDays size={16} aria-hidden="true" />
          Último análisis: {lastAnalysisDate}
        </span>
        <Button to="/analisis/nuevo">
          <Plus size={18} aria-hidden="true" />
          Nuevo análisis
        </Button>
      </div>

      <button
        className="dashboard-topbar__notifications"
        type="button"
        aria-label="Ver notificaciones"
      >
        <Bell size={20} aria-hidden="true" />
        {hasNotifications && (
          <span className="dashboard-topbar__notifications-dot" aria-hidden="true" />
        )}
      </button>
    </header>
  );
}

export default Topbar;
