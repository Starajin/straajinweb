import { Link } from "react-router-dom"
import MobileMenu from "./MobileMenu";
import { useTranslation } from "react-i18next";

interface MobileSidebarProps {
   offCanvas: boolean;
   setOffCanvas: (offCanvas: boolean) => void;
}

const Offcanvas = ({ offCanvas, setOffCanvas }: MobileSidebarProps) => {
   const { t, i18n } = useTranslation();

   const toggleLanguage = () => {
      const newLang = i18n.language === 'en' ? 'ko' : 'en';
      i18n.changeLanguage(newLang);
   };

   return (
      <>

         <div className="fix-area">
            <div className={`offcanvas__info ${offCanvas ? "info-open" : ""}`}>
               <div className="offcanvas__wrapper">
                  <div className="offcanvas__content">
                     <div className="offcanvas__top mb-4 d-flex justify-content-between align-items-center">
                        <div className="offcanvas__logo">
                           <Link to="/">
                              <img src="assets/img/logo/Starajin - Header.png" alt="StaraJIN Logo" />
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
                                 <span>{t('footer.seoulLocation')}</span>
                              </div>
                           </li>
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon mr-15">
                                 <i className="fal fa-envelope"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <Link to="mailto:info@starajin.com">
                                    <span>info@starajin.com</span>
                                 </Link>
                              </div>
                           </li>
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon mr-15">
                                 <i className="fal fa-clock"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <span>{t('cta.koreaOffice.hours')}</span>
                              </div>
                           </li>
                           <li className="d-flex align-items-center">
                              <div className="offcanvas__contact-icon mr-15">
                                 <i className="far fa-phone"></i>
                              </div>
                              <div className="offcanvas__contact-text">
                                 <Link to="tel:+82-2-1234-5678">+82-2-1234-5678</Link>
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
                           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                              <i className="fab fa-facebook-f"></i>
                           </a>
                           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                              <i className="fab fa-twitter"></i>
                           </a>
                           <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-instagram"></i>
                           </a>
                           <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-pinterest-p"></i>
                           </a>
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
