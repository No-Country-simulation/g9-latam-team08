import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import RouteContentFallback from "../../../components/layout/RouteContentFallback";
import MobileTabBar from "./MobileTabBar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "./useTheme";
import { dashboardMock } from "./dashboardMocks";
import "./DashboardLayout.css";

interface UserProfile {
  userName: string;
  userEmail: string;
  userPhoto: string | null;
}

function getUserProfile(): UserProfile {
  if (typeof window === "undefined") {
    return {
      userName: "Usuario",
      userEmail: "",
      userPhoto: null,
    };
  }

  return {
    userName: window.localStorage.getItem("userName") || "Usuario",
    userEmail: window.localStorage.getItem("userEmail") || "",
    userPhoto: window.localStorage.getItem("userPhoto"),
  };
}

function DashboardLayout() {
  const [theme, setTheme] = useTheme();
  const { userName, userEmail, userPhoto } = getUserProfile();

  return (
    <div className="dashboard-layout" data-theme={theme}>
      <Sidebar
        theme={theme}
        onThemeChange={setTheme}
        userName={userName}
        userEmail={userEmail}
        userPhoto={userPhoto}
      />

      <div className="dashboard-layout__content">
        <Topbar lastAnalysisDate={dashboardMock.lastAnalysisDate} hasNotifications />
        <main className="dashboard-layout__main">
          <Suspense fallback={<RouteContentFallback message="Cargando vista..." />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <MobileTabBar />
    </div>
  );
}

export default DashboardLayout;
