// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoanProvider } from "./context/LoanContext";
import { UserAccountProvider } from "./context/UserAccountContext";
import { NotificationProvider } from "./context/NotificationContext";

// PWA Service Worker Registration
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("New content available, please refresh!");
    // You can show a toast or modal to notify user
    if (confirm("New content available. Reload?")) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline");
    // You can show a toast that app is ready to work offline
  },
});

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
