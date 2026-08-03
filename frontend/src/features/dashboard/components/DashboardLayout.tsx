import type { ReactNode } from "react";
import MobileTabBar from "./MobileTabBar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
  lastAnalysisDate: string;
  hasNotifications?: boolean;
}

function DashboardLayout({ children, lastAnalysisDate, hasNotifications }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-layout__content">
        <Topbar lastAnalysisDate={lastAnalysisDate} hasNotifications={hasNotifications} />
        <main className="dashboard-layout__main">{children}</main>
      </div>

      <MobileTabBar />
    </div>
  );
}

export default DashboardLayout;
