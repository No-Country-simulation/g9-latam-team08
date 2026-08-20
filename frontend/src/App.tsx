import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import RouteContentFallback from "./components/layout/RouteContentFallback";

function App() {
  return (
    <Suspense fallback={<RouteContentFallback message="Cargando FinanceAI..." fullScreen />}>
      <Outlet />
    </Suspense>
  );
}

export default App;
