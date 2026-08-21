import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/tokens.css";
import "./styles/globals.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || "YOUR_GOOGLE_CLIENT_ID";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
