import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";
import { api } from "../../services/api";
import { useCmsData } from "../../hooks/useCmsData";
import { useLang } from "../../hooks/useLang";

const FooterOne = () => {
   const { t } = useTranslation();
   const { lang, pick } = useLang();

   const { data: settings } = useCmsData(() => api.getSettings(), {} as Record<string, string>);
   const { data: offices } = useCmsData(() => api.getOffices(), [] as any[]);
   const { data: cmsNav } = useCmsData(() => api.getNavigation(), [] as any[]);

   const footerLogo = settings.footerLogoUrl || '/assets/img/logo/Starajin - White.png';
   const footerDesc = lang === 'ko'
      ? (settings.footerDescription_ko || t('footer.description'))
      : (settings.footerDescription_en || t('footer.description'));
   const copyright = lang === 'ko'
      ? (settings.copyright_ko || settings.copyright || t('footer.rights'))
      : (settings.copyright_en || settings.copyright || t('footer.rights'));
   const contactEmail = settings.contactEmail || 'contact@starajin.com';

   const koreaOffice = offices.find((o: any) => o.sortOrder === 1) || offices[0];
   const indiaOffice = offices.find((o: any) => o.sortOrder === 2) || offices[1];

   return (
      <>
         <footer className="footer-section fix position-relative" style={{ backgroundColor: 'var(--footer-bg)', overflow: 'hidden' }}>
            <div className="position-relative">
               <div className="container" style={{ maxWidth: '1200px' }}>
                  {/* Main Footer Content */}
                  <div className="py-4">
                     <div className="row">
                        {/* Company Info */}
                        <div className="col-lg-3 col-md-6 mb-3 mb-lg-0">
                           <div className="mb-3">
                              <img
                                 src={footerLogo}
                                 alt="Starajin Logo"
                                 className="img-fluid"
                                 loading="lazy"
                                 style={{ height: '60px', width: 'auto' }}
                              />
                           </div>

                           <p className="text-white mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '300px' }}>
                              {footerDesc}
                           </p>

                           {/* Social Links */}
                           <div className="d-flex gap-2">
                              <a href={`mailto:${contactEmail}`} className="d-flex align-items-center justify-content-center social-link"
                                 style={{ width: '34px', height: '34px', backgroundColor: 'var(--footer-social-bg)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                                 <i className="fa-light fa-envelope text-white" style={{ fontSize: '14px' }}></i>
                              </a>
                              {settings.linkedinUrl && (
                                 <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center social-link"
                                    style={{ width: '34px', height: '34px', backgroundColor: 'var(--footer-social-bg)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                                    <i className="fab fa-linkedin-in text-white" style={{ fontSize: '14px' }}></i>
                                 </a>
                              )}
                              {settings.facebookUrl && (
                                 <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center social-link"
                                    style={{ width: '34px', height: '34px', backgroundColor: 'var(--footer-social-bg)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                                    <i className="fab fa-facebook-f text-white" style={{ fontSize: '14px' }}></i>
                                 </a>
                              )}
                              {settings.instagramUrl && (
                                 <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center justify-content-center social-link"
                                    style={{ width: '34px', height: '34px', backgroundColor: 'var(--footer-social-bg)', borderRadius: '50%', transition: 'all 0.3s ease' }}>
                                    <i className="fab fa-instagram text-white" style={{ fontSize: '14px' }}></i>
                                 </a>
                              )}
                           </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-2 col-md-6 col-6 mb-3 mb-lg-0">
                           <h5 className="fw-semibold mb-3" style={{ color: '#ffc700', fontSize: '1rem' }}>{t('footer.quickLinks')}</h5>
                           <ul className="list-unstyled mb-0">
                              {(cmsNav.length > 0
                                 ? cmsNav.filter((n: any) => n.url !== '/').map((n: any) => ({
                                    label: pick(n, 'label'),
                                    url: n.url,
                                 }))
                                 : [
                                    { label: t('nav.about'), url: '/about' },
                                    { label: t('nav.services'), url: '/services' },
                                    { label: t('nav.projects'), url: '/projects' },
                                    { label: t('nav.contact'), url: '/contact' },
                                 ]
                              ).map((item: any, idx: number) => (
                                 <li key={idx} className="mb-2">
                                    <Link to={item.url} className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                       {item.label}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* Services */}
                        <div className="col-lg-2 col-md-6 col-6 mb-3 mb-lg-0">
                           <h5 className="fw-semibold mb-3" style={{ color: '#ffc700', fontSize: '1rem' }}>{t('footer.services')}</h5>
                           <ul className="list-unstyled mb-0">
                              {[
                                 { label: t('services.businessDev'), url: '/services' },
                                 { label: t('services.consulting'), url: '/services' },
                                 { label: t('services.partnerMatching'), url: '/services' },
                                 { label: t('services.cultural'), url: '/services' },
                              ].map((item, idx) => (
                                 <li key={idx} className="mb-2">
                                    <Link to={item.url} className="text-white text-decoration-none footer-link" style={{ fontSize: '0.9rem' }}>
                                       {item.label}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-lg-5 col-md-12">
                           <h5 className="fw-semibold mb-3" style={{ color: '#ffc700', fontSize: '1rem' }}>{t('footer.contactUs')}</h5>
                           <div className="row">
                              {/* Korea Office */}
                              {koreaOffice && (
                              <div className="col-md-6 mb-3 mb-md-0">
                                 <h6 className="fw-semibold text-white mb-1" style={{ fontSize: '0.9rem' }}>
                                    {pick(koreaOffice, 'officeName')}
                                 </h6>
                                 <ul className="list-unstyled text-white mb-0" style={{ fontSize: '0.85rem' }}>
                                    <li className="d-flex align-items-start gap-2 mb-1">
                                       <i className="fa-light fa-location-dot" style={{ width: '14px', marginTop: '3px' }}></i>
                                       <span>{pick(koreaOffice, 'address')}</span>
                                    </li>
                                    {koreaOffice.phone && (
                                    <li className="d-flex align-items-center gap-2 mb-1">
                                       <i className="fa-light fa-phone" style={{ width: '14px' }}></i>
                                       <span>{koreaOffice.phone}</span>
                                    </li>
                                    )}
                                    {koreaOffice.email && (
                                    <li className="d-flex align-items-center gap-2">
                                       <i className="fa-light fa-envelope" style={{ width: '14px' }}></i>
                                       <span>{koreaOffice.email}</span>
                                    </li>
                                    )}
                                 </ul>
                              </div>
                              )}

                              {/* India Office */}
                              {indiaOffice && (
                              <div className="col-md-6">
                                 <h6 className="fw-semibold text-white mb-1" style={{ fontSize: '0.9rem' }}>
                                    {pick(indiaOffice, 'officeName')}
                                 </h6>
                                 <ul className="list-unstyled text-white mb-0" style={{ fontSize: '0.85rem' }}>
                                    <li className="d-flex align-items-start gap-2 mb-1">
                                       <i className="fa-light fa-location-dot" style={{ width: '14px', marginTop: '3px' }}></i>
                                       <span>{pick(indiaOffice, 'address')}</span>
                                    </li>
                                    {indiaOffice.phone && (
                                    <li className="d-flex align-items-center gap-2 mb-1">
                                       <i className="fa-light fa-phone" style={{ width: '14px' }}></i>
                                       <span>{indiaOffice.phone}</span>
                                    </li>
                                    )}
                                    {indiaOffice.email && (
                                    <li className="d-flex align-items-center gap-2">
                                       <i className="fa-light fa-envelope" style={{ width: '14px' }}></i>
                                       <span>{indiaOffice.email}</span>
                                    </li>
                                    )}
                                 </ul>
                              </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                     <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                        <div className="text-white small" style={{ opacity: 0.8 }}>
                           {copyright}
                        </div>

                        <div className="d-flex align-items-center gap-4 small">
                           <Link to="/privacy-policy" className="text-white text-decoration-none footer-legal-link" style={{ opacity: 0.8 }}>{t('footer.privacyPolicy')}</Link>
                           <Link to="/terms-of-service" className="text-white text-decoration-none footer-legal-link" style={{ opacity: 0.8 }}>{t('footer.termsOfService')}</Link>
                           <Link to="/cookie-policy" className="text-white text-decoration-none footer-legal-link" style={{ opacity: 0.8 }}>{t('footer.cookiePolicy')}</Link>
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
