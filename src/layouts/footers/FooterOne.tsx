import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const FooterOne = () => {
   const { t } = useTranslation();

   return (
      <>
         <footer className="footer-section fix position-relative" style={{ backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
            {/* Background Pattern */}
            <div className="position-absolute w-100 h-100" style={{ opacity: 0.05, backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            
            <div className="position-relative">
               <div className="container-fluid px-4 px-sm-6 px-lg-8" style={{ maxWidth: '1200px' }}>
                  {/* Main Footer Content */}
                  <div className="py-5">
                     <div className="row g-4">
                        {/* Company Info - Takes 2 columns on large screens */}
                        <div className="col-lg-6">
                           <div className="d-flex justify-content-center justify-content-lg-start align-items-center mb-4">
                              <img 
                                 src="/assets/img/logo/Starajin - White.png" 
                                 alt="Starajin Logo" 
                                 className="img-fluid" 
                                 style={{ 
                                    height: '128px', 
                                    width: 'auto'
                                 }}
                              />
                           </div>
                           
                           <p className="text-white opacity-75 mb-4 lh-relaxed" style={{ fontSize: '1.125rem', maxWidth: '28rem' }}>
                              {t('footer.description')}
                           </p>
                           
                           {/* Social Links */}
                           <div className="d-flex gap-3 mb-4">
                              <a href="#" className="d-flex align-items-center justify-content-center social-link" 
                                 style={{ 
                                    width: '56px', 
                                    height: '56px', 
                                    backgroundColor: '#023EDA', 
                                    borderRadius: '50%', 
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                 }}>
                                 <i className="fa-brands fa-linkedin-in text-white" style={{ fontSize: '24px' }}></i>
                              </a>
                              <a href="#" className="d-flex align-items-center justify-content-center social-link" 
                                 style={{ 
                                    width: '56px', 
                                    height: '56px', 
                                    backgroundColor: '#023EDA', 
                                    borderRadius: '50%', 
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                 }}>
                                 <i className="fa-brands fa-twitter text-white" style={{ fontSize: '24px' }}></i>
                              </a>
                              <a href="#" className="d-flex align-items-center justify-content-center social-link" 
                                 style={{ 
                                    width: '56px', 
                                    height: '56px', 
                                    backgroundColor: '#023EDA', 
                                    borderRadius: '50%', 
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                 }}>
                                 <i className="fa-brands fa-instagram text-white" style={{ fontSize: '24px' }}></i>
                              </a>
                              <a href="#" className="d-flex align-items-center justify-content-center social-link" 
                                 style={{ 
                                    width: '56px', 
                                    height: '56px', 
                                    backgroundColor: '#023EDA', 
                                    borderRadius: '50%', 
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                 }}>
                                 <i className="fa-light fa-envelope text-white" style={{ fontSize: '24px' }}></i>
                              </a>
                           </div>

                           {/* Newsletter */}
                           <div className="p-4 rounded-3" style={{ backgroundColor: '#333333' }}>
                              <h4 className="h5 fw-semibold mb-3 text-white">{t('footer.stayUpdated')}</h4>
                              <p className="text-white opacity-75 mb-4" style={{ fontSize: '1rem' }}>{t('footer.getLatestInsights')}</p>
                              <div className="d-flex">
                                 <input
                                    type="email"
                                    placeholder={t('footer.enterEmail')}
                                    className="form-control border-0 rounded-start"
                                    style={{ 
                                       backgroundColor: '#555555', 
                                       color: 'white',
                                       borderColor: '#666666'
                                    }}
                                 />
                                 <button className="btn px-4 rounded-end" style={{ backgroundColor: '#ffc700', border: 'none' }}>
                                    <i className="fa-light fa-arrow-right text-white" style={{ fontSize: '20px' }}></i>
                                 </button>
                              </div>
                           </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-3 col-md-6">
                           <h3 className="h5 fw-semibold mb-4" style={{ color: '#ffc700' }}>{t('footer.quickLinks')}</h3>
                           <ul className="list-unstyled">
                              <li className="mb-3">
                                 <Link 
                                    to="/about" 
                                    className="text-white opacity-75 text-decoration-none footer-link"
                                    style={{ fontSize: '1rem', transition: 'all 0.2s ease' }}
                                 >
                                    {t('nav.about')}
                                 </Link>
                              </li>
                              <li className="mb-3">
                                 <Link 
                                    to="/services" 
                                    className="text-white opacity-75 text-decoration-none footer-link"
                                    style={{ fontSize: '1rem', transition: 'all 0.2s ease' }}
                                 >
                                    {t('nav.services')}
                                 </Link>
                              </li>
                              <li className="mb-3">
                                 <Link 
                                    to="/projects" 
                                    className="text-white opacity-75 text-decoration-none footer-link"
                                    style={{ fontSize: '1rem', transition: 'all 0.2s ease' }}
                                 >
                                    {t('nav.projects')}
                                 </Link>
                              </li>
                              <li className="mb-3">
                                 <Link 
                                    to="/contact" 
                                    className="text-white opacity-75 text-decoration-none footer-link"
                                    style={{ fontSize: '1rem', transition: 'all 0.2s ease' }}
                                 >
                                    {t('nav.contact')}
                                 </Link>
                              </li>
                           </ul>

                           <h4 className="h5 fw-semibold mt-5 mb-4" style={{ color: '#ffc700' }}>{t('footer.services')}</h4>
                           <ul className="list-unstyled">
                              <li className="mb-2">
                                 <a href="#" className="text-white opacity-50 text-decoration-none service-link" 
                                    style={{ fontSize: '1rem', transition: 'color 0.2s ease' }}>
                                    {t('services.businessDev')}
                                 </a>
                              </li>
                              <li className="mb-2">
                                 <a href="#" className="text-white opacity-50 text-decoration-none service-link" 
                                    style={{ fontSize: '1rem', transition: 'color 0.2s ease' }}>
                                    {t('services.consulting')}
                                 </a>
                              </li>
                              <li className="mb-2">
                                 <a href="#" className="text-white opacity-50 text-decoration-none service-link" 
                                    style={{ fontSize: '1rem', transition: 'color 0.2s ease' }}>
                                    {t('services.partnerMatching')}
                                 </a>
                              </li>
                              <li className="mb-2">
                                 <a href="#" className="text-white opacity-50 text-decoration-none service-link" 
                                    style={{ fontSize: '1rem', transition: 'color 0.2s ease' }}>
                                    {t('services.cultural')}
                                 </a>
                              </li>
                           </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-3 col-md-6">
                           <h3 className="h6 fw-semibold mb-4" style={{ color: '#ffc700' }}>{t('footer.contactUs')}</h3>
                           
                           {/* Korea Office */}
                           <div className="mb-4">
                              <h4 className="fw-semibold mb-3 d-flex align-items-center text-white">
                                 🇰🇷 {t('footer.koreaOffice')}
                              </h4>
                              <div className="text-white opacity-75 small">
                                 <div className="d-flex align-items-start gap-2 mb-2">
                                    <i className="fa-light fa-map-marker-alt mt-1" style={{ fontSize: '16px', flexShrink: 0 }}></i>
                                    <span>Seoul, South Korea</span>
                                 </div>
                                 <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-light fa-phone" style={{ fontSize: '16px', flexShrink: 0 }}></i>
                                    <span>+82-2-1234-5678</span>
                                 </div>
                                 <div className="d-flex align-items-center gap-2">
                                    <i className="fa-light fa-envelope" style={{ fontSize: '16px', flexShrink: 0 }}></i>
                                    <span>korea@starajin.com</span>
                                 </div>
                              </div>
                           </div>

                           {/* India Office */}
                           <div>
                              <h4 className="fw-semibold mb-3 d-flex align-items-center text-white">
                                 🇮🇳 {t('footer.indiaOffice')}
                              </h4>
                              <div className="text-white opacity-75 small">
                                 <div className="d-flex align-items-start gap-2 mb-2">
                                    <i className="fa-light fa-map-marker-alt mt-1" style={{ fontSize: '16px', flexShrink: 0 }}></i>
                                    <span>Mumbai, India</span>
                                 </div>
                                 <div className="d-flex align-items-center gap-2 mb-2">
                                    <i className="fa-light fa-phone" style={{ fontSize: '16px', flexShrink: 0 }}></i>
                                    <span>+91-22-9876-5432</span>
                                 </div>
                                 <div className="d-flex align-items-center gap-2">
                                    <i className="fa-light fa-envelope" style={{ fontSize: '16px', flexShrink: 0 }}></i>
                                    <span>india@starajin.com</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="py-4" style={{ borderTop: '1px solid #333333' }}>
                     <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div className="text-white opacity-50 small mb-3 mb-md-0">
                           {t('footer.rights')}
                        </div>
                        
                        <div className="d-flex align-items-center gap-4 small text-white opacity-50">
                           <a href="#" className="text-white opacity-50 text-decoration-none footer-legal-link">{t('footer.privacyPolicy')}</a>
                           <a href="#" className="text-white opacity-50 text-decoration-none footer-legal-link">{t('footer.termsOfService')}</a>
                           <a href="#" className="text-white opacity-50 text-decoration-none footer-legal-link">{t('footer.cookiePolicy')}</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>

         {/* Custom Styles for Hover Effects */}
         <style>{`
            .social-link:hover {
               background-color: #ffc700 !important;
               transform: scale(1.1);
            }
            
            .footer-link:hover {
               opacity: 1 !important;
               color: white !important;
               transform: translateX(4px);
            }
            
            .service-link:hover {
               opacity: 0.75 !important;
            }
            
            .footer-legal-link:hover {
               color: white !important;
               opacity: 1 !important;
            }
         `}</style>
      </>
   )
}

export default FooterOne