import type { ReactNode } from "react";
import MobileTabBar from "./MobileTabBar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "./useTheme";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
  lastAnalysisDate: string;
  hasNotifications?: boolean;
}

function DashboardLayout({ children, lastAnalysisDate, hasNotifications }: DashboardLayoutProps) {
  const [theme, setTheme] = useTheme();

  return (
    <div className="dashboard-layout" data-theme={theme}>
      <Sidebar theme={theme} onThemeChange={setTheme} />

      <div className="dashboard-layout__content">
        <Topbar lastAnalysisDate={lastAnalysisDate} hasNotifications={hasNotifications} />
        <main className="dashboard-layout__main">{children}</main>
      </div>

      <MobileTabBar />
    </div>
  );
}

export default DashboardLayout;
