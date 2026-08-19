import { Bell } from "lucide-react";
import Card from "../../../components/ui/Card";

function NotificationsTipCard() {
  return (
    <Card className="notifications-page__sidebar-card notifications-page__tip-card">
      <div className="notifications-page__tip-icon">
        <Bell size={18} aria-hidden="true" />
      </div>
      <div className="notifications-page__tip-copy">
        <h2>Truco rápido</h2>
        <p>
          Activá las notificaciones para no perderte alertas importantes y mantener
          el control de tu salud financiera.
        </p>
      </div>
    </Card>
  );
}

export default NotificationsTipCard;
