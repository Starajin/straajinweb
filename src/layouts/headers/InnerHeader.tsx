import NavMenu from "./Menu/NavMenu"
import { useState, useCallback, type MouseEvent } from "react";
import Offcanvas from "./Menu/Offcanvas";
import HeaderSearch from "./Menu/HeaderSearch";
import UseSticky from "../../hooks/UseSticky";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const InnerHeader = () => {

   const { sticky } = UseSticky();
   const { t, i18n } = useTranslation();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [isSearch, setIsSearch] = useState<boolean>(false);
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
            className={`header-section inner-header style1 w-100 ${sticky ? "sticky" : ""}`}
         >
            <div className="container">
               <div className="mega-menu-wrapper">
                  <div className="header-main d-flex align-items-center justify-content-between">
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

                        {/* Search */}
                        <button
                           onClick={() => setIsSearch(true)}
                           className="header-icon-btn"
                           title={t('nav.search', 'Search')}
                           aria-label={t('nav.search', 'Search')}
                           type="button"
                        >
                           <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                        {/* WhatsApp / KakaoTalk */}
                        <a
                           href={support.href}
                           onClick={onSupportClick}
                           className="header-icon-btn header-support-link"
                           title={support.label}
                           aria-label={`${t('nav.support247', '24/7 Support')} — ${support.label}`}
                           rel="noreferrer"
                        >
                           {isKorean ? (
                              <span className="header-support-icon--kakao" aria-hidden="true">K</span>
                           ) : (
                              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
                           )}
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
         <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
      </>
   )
}

export default InnerHeader
