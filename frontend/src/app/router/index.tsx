import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../pages/LandingPage";
import NewAnalysisPage from "../../pages/NewAnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "demo",
        element: <LandingPage initialSection="demo" />,
      },
      {
        path: "analisis/nuevo",
        element: <NewAnalysisPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
