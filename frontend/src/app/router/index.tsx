import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../pages/LandingPage";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
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
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
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
