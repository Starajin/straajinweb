import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const FooterOne = () => {
   const { t } = useTranslation();

   return (
      <>
         <footer className="footer-section fix position-relative" style={{ backgroundColor: 'var(--footer-bg)', overflow: 'hidden' }}>
            <div className="position-relative">
               <div className="container" style={{ maxWidth: '1200px' }}>
                  {/* Main Footer Content */}
                  <div className="py-4">
                     <div className="row">
                        {/* Company Info */}
                        <div className="col-lg-4 col-md-6 mb-3 mb-lg-0">
                           <div className="mb-3">
                              <img 
                                 src="/assets/img/logo/Starajin - White.png" 
                                 alt="Starajin Logo" 
                                 className="img-fluid" 
                                 style={{ height: '60px', width: 'auto' }}
                              />
                           </div>
                           
                           <p className="text-white mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
                              {t('footer.description')}
                           </p>
                           
                           {/* Social Links */}
                           <div className="d-flex gap-2">
                              <a href="mailto:korea@starajin.com" className="d-flex align-items-center justify-content-center social-link"
                                 style={{ width: '34px', height: '34px', backgroundColor: 'var(--footer-social-bg)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                                 <i className="fa-light fa-envelope text-white" style={{ fontSize: '14px' }}></i>
                              </a>
                           </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-2 col-md-6 col-6 mb-3 mb-lg-0">
                           <h5 className="fw-semibold mb-3" style={{ color: '#ffc700', fontSize: '1rem' }}>{t('footer.quickLinks')}</h5>
                           <ul className="list-unstyled mb-0">
                              <li className="mb-2">
                                 <Link to="/about" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('nav.about')}
                                 </Link>
                              </li>
                              <li className="mb-2">
                                 <Link to="/services" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('nav.services')}
                                 </Link>
                              </li>
                              <li className="mb-2">
                                 <Link to="/projects" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('nav.projects')}
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/contact" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('nav.contact')}
                                 </Link>
                              </li>
                           </ul>
                        </div>

                        {/* Services */}
                        <div className="col-lg-3 col-md-6 col-6 mb-3 mb-lg-0">
                           <h5 className="fw-semibold mb-3" style={{ color: '#ffc700', fontSize: '1rem' }}>{t('footer.services')}</h5>
                           <ul className="list-unstyled mb-0">
                              <li className="mb-2">
                                 <Link to="/services" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('services.businessDev')}
                                 </Link>
                              </li>
                              <li className="mb-2">
                                 <Link to="/services" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('services.consulting')}
                                 </Link>
                              </li>
                              <li className="mb-2">
                                 <Link to="/services" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('services.partnerMatching')}
                                 </Link>
                              </li>
                              <li>
                                 <Link to="/services" className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                    {t('services.cultural')}
                                 </Link>
                              </li>
                           </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-3 col-md-6">
                           <h5 className="fw-semibold mb-3" style={{ color: '#ffc700', fontSize: '1rem' }}>{t('footer.contactUs')}</h5>
                           
                           {/* Korea Office */}
                           <div className="mb-3">
                              <h6 className="fw-semibold text-white mb-1" style={{ fontSize: '0.9rem' }}>
                                 {t('footer.koreaOffice')}
                              </h6>
                              <ul className="list-unstyled text-white mb-0" style={{ fontSize: '0.85rem' }}>
                                 <li className="d-flex align-items-center gap-2 mb-1">
                                    <i className="fa-light fa-location-dot" style={{ width: '14px' }}></i>
                                    <span>{t('footer.seoulLocation')}</span>
                                 </li>
                                 <li className="d-flex align-items-center gap-2 mb-1">
                                    <i className="fa-light fa-phone" style={{ width: '14px' }}></i>
                                    <span>{t('footer.koreaPhone')}</span>
                                 </li>
                                 <li className="d-flex align-items-center gap-2">
                                    <i className="fa-light fa-envelope" style={{ width: '14px' }}></i>
                                    <span>{t('footer.koreaEmail')}</span>
                                 </li>
                              </ul>
                           </div>

                           {/* India Office */}
                           <div>
                              <h6 className="fw-semibold text-white mb-1" style={{ fontSize: '0.9rem' }}>
                                 {t('footer.indiaOffice')}
                              </h6>
                              <ul className="list-unstyled text-white mb-0" style={{ fontSize: '0.85rem' }}>
                                 <li className="d-flex align-items-center gap-2 mb-1">
                                    <i className="fa-light fa-location-dot" style={{ width: '14px' }}></i>
                                    <span>{t('footer.mumbaiLocation')}</span>
                                 </li>
                                 <li className="d-flex align-items-center gap-2 mb-1">
                                    <i className="fa-light fa-phone" style={{ width: '14px' }}></i>
                                    <span>{t('footer.indiaPhone')}</span>
                                 </li>
                                 <li className="d-flex align-items-center gap-2">
                                    <i className="fa-light fa-envelope" style={{ width: '14px' }}></i>
                                    <span>{t('footer.indiaEmail')}</span>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                     <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                        <div className="text-white small" style={{ opacity: 0.8 }}>
                           {t('footer.rights')}
                        </div>
                        
                        <div className="d-flex align-items-center gap-4 small">
                           <span className="text-white text-decoration-none footer-legal-link" style={{ opacity: 0.8, cursor: 'default' }}>{t('footer.privacyPolicy')}</span>
                           <span className="text-white text-decoration-none footer-legal-link" style={{ opacity: 0.8, cursor: 'default' }}>{t('footer.termsOfService')}</span>
                           <span className="text-white text-decoration-none footer-legal-link" style={{ opacity: 0.8, cursor: 'default' }}>{t('footer.cookiePolicy')}</span>
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
            
            .footer-link {
               transition: all 0.2s ease;
            }
            
            .footer-link:hover {
               color: #ffc700 !important;
            }
            
            .footer-legal-link:hover {
               color: #ffc700 !important;
               opacity: 1 !important;
            }
         `}</style>
      </>
   )
}

export default FooterOne