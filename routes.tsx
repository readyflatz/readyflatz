import { lazy, type ReactNode } from 'react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const Comparison = lazy(() => import('./pages/Comparison'));
const LocationDetail = lazy(() => import('./pages/LocationDetail'));
const DiscoveryFeed = lazy(() => import('./pages/DiscoveryFeed'));
const BuilderDetail = lazy(() => import('./pages/BuilderDetail'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const SSLDiagnostic = lazy(() => import('./pages/SSLDiagnostic'));
const HealthCheck = lazy(() => import('./pages/HealthCheck'));

// Static pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const BrokerDashboard = lazy(() => import('./pages/broker/BrokerDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const Forbidden = lazy(() => import('./pages/Forbidden'));
const NotFound = lazy(() => import('./pages/NotFound'));

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'SSL Diagnostic',
    path: '/ssl-diagnostic',
    element: <SSLDiagnostic />
  },
  {
    name: 'Health Check',
    path: '/health',
    element: <HealthCheck />
  },
  {
    name: 'Discovery Feed',
    path: '/discovery',
    element: <DiscoveryFeed />
  },

  {
    name: 'Search Results',
    path: '/search',
    element: <Search />
  },
  {
    name: 'Property Detail New',
    path: '/property/:slug',
    element: <PropertyDetail />
  },
  {
    name: 'Project Detail Legacy',
    path: '/projects/:slug',
    element: <PropertyDetail />
  },
  {
    name: 'Property Detail Legacy',
    path: '/properties/:id',
    element: <PropertyDetail />
  },
  {
    name: 'Compare Properties',
    path: '/compare',
    element: <Comparison />
  },
  {
    name: 'Compare Properties Detailed',
    path: '/compare/:slugs',
    element: <Comparison />
  },
  {
    name: 'PropertyLocation Detail',
    path: '/locations/:slug',
    element: <LocationDetail />
  },
  {
    name: 'Builder Detail',
    path: '/builders/:slug',
    element: <BuilderDetail />
  },
  {
    name: 'Blog List',
    path: '/blogs',
    element: <BlogList />
  },
  {
    name: 'Blog Detail',
    path: '/blogs/:slug',
    element: <BlogDetail />
  },
  {
    name: 'About',
    path: '/about',
    element: <About />
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact />
  },
  {
    name: 'FAQ',
    path: '/faq',
    element: <FAQ />
  },
  {
    name: 'Privacy Policy',
    path: '/privacy-policy',
    element: <PrivacyPolicy />
  },
  {
    name: 'Terms of Service',
    path: '/terms-of-service',
    element: <TermsOfService />
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />
  },
  {
    name: 'User Dashboard',
    path: '/user/*',
    element: <UserDashboard />
  },

  {
    name: 'Register',
    path: '/register',
    element: <Register />
  },
  {
    name: 'Broker Dashboard',
    path: '/broker/*',
    element: <BrokerDashboard />
  },
  {
    name: 'Admin Dashboard',
    path: '/admin/*',
    element: <AdminDashboard />
  },
  {
    name: 'Forbidden',
    path: '/403',
    element: <Forbidden />
  },
  {
    name: 'Not Found',
    path: '*',
    element: <NotFound />
  }
];

export default routes;
