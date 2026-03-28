import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { UserBehaviorProvider } from "@/contexts/UserBehaviorContext";
import { ConnectivityMonitor } from "@/components/common/ConnectivityMonitor";

// Environment validation
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Missing required environment variables. Please check your .env file.');
}

// Global protocol error guard (helps catch SSL handshake issues early)
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && (event.reason.message === 'Failed to fetch' || event.reason.name === 'TypeError')) {
     console.warn('Network or Protocol Error detected. User connectivity may be unstable.');
  }
});

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper>
      <AuthProvider>
        <SearchProvider>
          <FavoritesProvider>
            <ComparisonProvider>
              <UserBehaviorProvider>
                <App />
              </UserBehaviorProvider>
            </ComparisonProvider>
          </FavoritesProvider>
        </SearchProvider>
      </AuthProvider>
    </AppWrapper>
  </StrictMode>
);
