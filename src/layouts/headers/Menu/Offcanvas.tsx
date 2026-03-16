import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu";
import { useTranslation } from "react-i18next";
import { api } from "../../../services/api";
import { useCmsData } from "../../../hooks/useCmsData";
import { useLang } from "../../../hooks/useLang";

interface MobileSidebarProps {
   offCanvas: boolean;
   setOffCanvas: (offCanvas: boolean) => void;
}

const Offcanvas = ({ offCanvas, setOffCanvas }: MobileSidebarProps) => {
   const { t, i18n } = useTranslation();
   const { pick } = useLang();

   const { data: settings } = useCmsData(() => api.getSettings(), {} as Record<string, string>);
   const { data: offices } = useCmsData(() => api.getOffices(), [] as any[]);
   const koreaOffice = offices.find((o: any) => o.sortOrder === 1) || offices[0];

   const headerLogo = settings.headerLogoUrl || settings.logoUrl || '/assets/img/logo/Starajin - Header.png';

   const toggleLanguage = () => {
      const newLang = i18n.language === 'en' ? 'ko' : 'en';
      i18n.changeLanguage(newLang);
   };

   const address = koreaOffice ? pick(koreaOffice, 'address') : t('footer.seoulLocation');
   const email = koreaOffice?.email || t('footer.koreaEmail');
   const phone = koreaOffice?.phone || t('footer.koreaPhone');
   const hours = koreaOffice ? pick(koreaOffice, 'hours') : t('cta.koreaOffice.hours');

   return (
      <>

         <div className="fix-area">
            <div className={`offcanvas__info ${offCanvas ? "info-open" : ""}`}>
               <div className="offcanvas__wrapper">
                  <div className="offcanvas__content">
                     <div className="offcanvas__top mb-4 d-flex justify-content-between align-items-center">
                        <div className="offcanvas__logo">
                           <Link to="/">
                              <img src={headerLogo} alt="StaraJIN Logo" style={{ maxWidth: '120px', height: 'auto' }} />
                           </Link>
                        </div>

                        {/* Language Toggle */}
                        <div className="language-toggle me-3">
                           <button
                              onClick={toggleLanguage}
                              className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                              title={i18n.language === 'en' ? 'Switch to Korean' : 'Switch to English'}
                           >
                              <i className="fas fa-globe"></i>
                              <span>{i18n.language === 'en' ? 'KO' : 'EN'}</span>
                           </button>
                        </div>

                        <div className="offcanvas__close">
                           <button onClick={() => setOffCanvas(false)}>
                              <i className="fas fa-times"></i>
                           </button>
                        </div>
                     </div>

                     <div className="mobile-menu fix mb-3"></div>
                     <div className="mobile-menu fix mb-3 mean-container">
                        <div className="mean-bar">
                           <nav className="mean-nav">
                              <MobileMenu />
                           </nav>
                        </div>
                     </div>
                     <div className="offcanvas__contact">
                        <h4 className="n900-clr">{t('cta.contactInfo', 'Contact Info')}</h4>
                        <ul className="d-grid gap-2 mb-5">
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon">
                                 <i className="fal fa-map-marker-alt"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <span>{address}</span>
                              </div>
                           </li>
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon mr-15">
                                 <i className="fal fa-envelope"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <a href={`mailto:${email}`}>
                                    <span>{email}</span>
                                 </a>
                              </div>
                           </li>
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon mr-15">
                                 <i className="fal fa-clock"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <span>{hours}</span>
                              </div>
                           </li>
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon mr-15">
                                 <i className="far fa-phone"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <a href={`tel:${phone}`}>{phone}</a>
                              </div>
                           </li>
                        </ul>
                        <div className="header-button mt-4">
                           <Link to="/contact" className="theme-btn p2-bg d-center gap-2 text-center">
                              <span>
                                 {t('common.getQuote', 'Get A Quote')}
                                 <span className="ani-arrow">
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                 </span>
                              </span>
                           </Link>
                        </div>
                        <div className="social-icon d-flex align-items-center">
                           {settings.facebookUrl && (
                              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">
                                 <i className="fab fa-facebook-f"></i>
                              </a>
                           )}
                           {settings.twitterUrl && (
                              <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer">
                                 <i className="fab fa-twitter"></i>
                              </a>
                           )}
                           {settings.instagramUrl && (
                              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer">
                                 <i className="fa-brands fa-instagram"></i>
                              </a>
                           )}
                           {settings.linkedinUrl && (
                              <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                 <i className="fab fa-linkedin-in"></i>
                              </a>
                           )}
                           {settings.pinterestUrl && (
                              <a href={settings.pinterestUrl} target="_blank" rel="noopener noreferrer">
                                 <i className="fa-brands fa-pinterest-p"></i>
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div onClick={() => setOffCanvas(false)} className={`offcanvas__overlay ${offCanvas ? "overlay-open" : ""}`}></div>
      </>
   )
}

export default Offcanvas
