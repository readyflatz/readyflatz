import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { PerformanceOptimization, SecurityHeaders, PWAMetaTags } from '@/lib/seo-helpers';
import ErrorBoundary from '@/components/ErrorBoundary';
import { initializeErrorHandling } from '@/lib/global-error-handler';

import routes from './routes';

import { RouteGuard } from '@/components/common/RouteGuard';
import { ContentProtection } from '@/components/common/ContentProtection';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import PageTransition from '@/components/common/PageTransition';
import ChatWidget from '@/components/chat/ChatWidget';
import { ConnectivityMonitor } from '@/components/common/ConnectivityMonitor';
import { ConnectionStatusBanner } from '@/components/common/ConnectionStatus';
import { GlobalExpertTrigger } from '@/components/common/GlobalExpertTrigger';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const PageLoader = () => (
  <div className="container py-24 space-y-8 animate-pulse">
    <Skeleton className="h-12 w-3/4 mx-auto bg-muted/20" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 rounded-[2rem] bg-muted/10" />)}
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isPropertyDetailPage = location.pathname.startsWith('/property/') || location.pathname.startsWith('/properties/') || location.pathname.startsWith('/projects/');

  return (
    <RouteGuard>
      <ContentProtection>
        {/* Global SEO Optimization */}
        <PerformanceOptimization />
        <SecurityHeaders />
        <PWAMetaTags />
        
        <div className={cn(
          "flex flex-col min-h-screen relative transition-all duration-300",
          isPropertyDetailPage ? "pb-0" : "pb-20 md:pb-0"
        )}>
          <ConnectionStatusBanner />
          <ConnectivityMonitor />
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PageTransition>
                        {route.element}
                      </PageTransition>
                    }
                  />
                ))}
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BottomNav />
          <CookieConsent />
          <ChatWidget />
          <GlobalExpertTrigger />
        </div>
      </ContentProtection>
    </RouteGuard>
  );
};

const App: React.FC = () => {
  // Initialize global error handling on app mount
  useEffect(() => {
    initializeErrorHandling();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <PerformanceOptimization />
        <SecurityHeaders />
        <PWAMetaTags />
        <Router>
          <IntersectObserver />
          <AppContent />
          <Toaster />
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
