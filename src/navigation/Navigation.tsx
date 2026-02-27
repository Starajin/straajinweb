import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const HomeMain = lazy(() => import('../pages/HomeMain'));
const AboutMain = lazy(() => import('../pages/AboutMain'));
const ServiceMain = lazy(() => import('../pages/ServiceMain'));
const ServiceDetailsMain = lazy(() => import('../pages/ServiceDetailsMain'));
const BlogMain = lazy(() => import('../pages/BlogMain'));
const BlogDetailsMain = lazy(() => import('../pages/BlogDetailsMain'));
const ProjectsMain = lazy(() => import('../pages/ProjectsMain'));
const ContactMain = lazy(() => import('../pages/ContactMain'));
const NotFoundMain = lazy(() => import('../pages/NotFoundMain'));

const AppNavigation = () => {
  return (
    <Router>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
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
          <Route path="*" element={<NotFoundMain />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppNavigation;
