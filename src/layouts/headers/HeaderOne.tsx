import NavMenu from "./Menu/NavMenu"
import { useState, useCallback, type MouseEvent } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const HeaderOne = () => {

   const { sticky } = UseSticky();
   const { t, i18n } = useTranslation();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const location = useLocation();

   const isKorean = (i18n.resolvedLanguage || i18n.language || "").toLowerCase().startsWith("ko");
   const whatsappDigits = "59767809876";

   const support: { href: string; fallbackHref?: string; label: string } = isKorean
      ? {
         href: "kakaotalk://launch",
         fallbackHref: "https://open.kakao.com/",
         label: "KakaoTalk",
      }
      : {
         href: `https://wa.me/${whatsappDigits}`,
         label: "WhatsApp",
      };

   const onSupportClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (!support.fallbackHref) return;
      event.preventDefault();
      window.location.href = support.href;
      window.setTimeout(() => {
         window.location.href = support.fallbackHref!;
      }, 700);
   };

   const toggleOffCanvas = useCallback(() => setOffCanvas(prev => !prev), []);
   const isActive = (path: string) => location.pathname === path;

   return (
      <>
         <a href="#main-content" className="skip-to-content">
            {t('accessibility.skipToContent', 'Skip to main content')}
         </a>
         <header
            id="header-sticky"
            role="banner"
            className={`header-section style1 w-100 ${sticky ? "sticky" : ""}`}
         >
            <div className="container">
               <div className="mega-menu-wrapper">
                  <div className="header-main" role="navigation" aria-label={t('nav.mainNavigation', 'Main navigation')}>
                     {/* Logo */}
                     <div className="header-left">
                        <Link to="/" className="header-logo" aria-label={t('nav.goHome', 'StaraJIN — Go to homepage')}>
                           <img
                              src="/assets/img/logo/Starajin - Header  3x svg.svg"
                              alt=""
                              role="presentation"
                              width="110"
                              height="40"
                           />
                        </Link>
                     </div>

                     {/* Desktop Nav */}
                     <nav className="header-center d-none d-xl-flex align-items-center" aria-label={t('nav.primary', 'Primary')}>
                        <div className="main-menu">
                           <NavMenu />
                        </div>
                     </nav>

                     {/* Actions */}
                     <div className="header-actions-bar d-none d-xl-flex align-items-center">
                        <LanguageSwitcher />

                        <Link
                           to="/contact"
                           className={`header-cta-btn ${isActive('/contact') ? 'header-cta-btn--active' : ''}`}
                           aria-current={isActive('/contact') ? 'page' : undefined}
                        >
                           <span className="header-cta-btn__icon" aria-hidden="true">
                              <i className="fa-solid fa-arrow-right"></i>
                           </span>
                           <span className="header-cta-btn__label">{t('nav.contact')}</span>
                        </Link>

                        <a
                           href={support.href}
                           onClick={onSupportClick}
                           className="header-support-chip"
                           aria-label={`${t('nav.support247', '24/7 Support')} — ${support.label}`}
                           title={support.label}
                           rel="noreferrer"
                        >
                           <span className="header-support-chip__icon" aria-hidden="true">
                              {isKorean ? (
                                 <span className="header-support-icon--kakao">K</span>
                              ) : (
                                 <i className="fa-brands fa-whatsapp"></i>
                              )}
                           </span>
                           <span className="header-support-chip__text d-none d-xxl-block">
                              <span className="header-support-chip__label">{t('nav.support247', '24/7 Support')}</span>
                              <span className="header-support-chip__channel">{isKorean ? 'KakaoTalk' : 'WhatsApp'}</span>
                           </span>
                        </a>
                     </div>

                     {/* Mobile hamburger */}
                     <button
                        className="header-burger d-xl-none"
                        onClick={toggleOffCanvas}
                        aria-label={t('nav.openMenu', 'Open navigation menu')}
                        aria-expanded={offCanvas}
                        aria-controls="offcanvas-menu"
                        type="button"
                     >
                        <span className="header-burger__line" />
                        <span className="header-burger__line" />
                        <span className="header-burger__line" />
                     </button>
                  </div>
               </div>
            </div>
         </header>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderOne
