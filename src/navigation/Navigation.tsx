import { lazy, Suspense, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import CookieConsent from '../components/CookieConsent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      // page_view event instead of re-running 'config', which re-probes
      // cookie domains on every navigation and spams console warnings
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
};

const HomeMain = lazy(() => import('../pages/HomeMain'));
const AboutMain = lazy(() => import('../pages/AboutMain'));
const ServiceMain = lazy(() => import('../pages/ServiceMain'));
const ServiceDetailsMain = lazy(() => import('../pages/ServiceDetailsMain'));
const BlogMain = lazy(() => import('../pages/BlogMain'));
const BlogDetailsMain = lazy(() => import('../pages/BlogDetailsMain'));
const ProjectsMain = lazy(() => import('../pages/ProjectsMain'));
const ContactMain = lazy(() => import('../pages/ContactMain'));
const PrivacyPolicyMain = lazy(() => import('../pages/PrivacyPolicyMain'));
const TermsOfServiceMain = lazy(() => import('../pages/TermsOfServiceMain'));
const CookiePolicyMain = lazy(() => import('../pages/CookiePolicyMain'));
const NotFoundMain = lazy(() => import('../pages/NotFoundMain'));

const AppNavigation = () => {
  return (
    <Router>
      <RouteTracker />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <main id="main-content">
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/about" element={<AboutMain />} />
          <Route path="/services" element={<ServiceMain />} />
          <Route path="/services-details" element={<ServiceDetailsMain />} />
          <Route path="/blog" element={<BlogMain />} />
          <Route path="/blog-details" element={<BlogDetailsMain />} />
          <Route path="/blog-details/:id" element={<BlogDetailsMain />} />
          <Route path="/projects" element={<ProjectsMain />} />
          <Route path="/contact" element={<ContactMain />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyMain />} />
          <Route path="/terms-of-service" element={<TermsOfServiceMain />} />
          <Route path="/cookie-policy" element={<CookiePolicyMain />} />
          <Route path="*" element={<NotFoundMain />} />
        </Routes>
        </main>
      </Suspense>
      <CookieConsent />
    </Router>
  );
};

export default AppNavigation;
