import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import LandingPage from "../../pages/LandingPage";
import Login from "../../pages/Login";
import Historial from "../../pages/Historial";
import Register from "../../pages/Register";
import NewAnalysisPage from "../../pages/NewAnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthLayout from "../../components/layout/AuthLayout";

import Nav from "../../components/layout/Nav";

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

        element: <Nav />,
        children: [
          {
            path: "historial",
            element: <Historial />,
          }
        ],
      },


        {
        element: <AuthLayout />,
        children: [
            {
            path: "login",
            element: <Login />,
            },
            {
            path: "register",
            element: <Register />,
            },
        
        ],
    },


      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
