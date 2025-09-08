// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoanProvider } from "./context/LoanContext";
import { UserAccountProvider } from "./context/UserAccountContext";
import { NotificationProvider } from "./context/NotificationContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NotificationProvider>
      <UserAccountProvider>
        <LoanProvider>
          <Router />
        </LoanProvider>
      </UserAccountProvider>
    </NotificationProvider>
  </BrowserRouter>
);
