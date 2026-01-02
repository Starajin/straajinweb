import NavMenu from "./Menu/NavMenu"
import { useState, type MouseEvent } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const HeaderOne = () => {

   const { sticky } = UseSticky();
   const { t, i18n } = useTranslation();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

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

   return (
      <>
         <header id="header-sticky" className={`header-section style1 w-100 ${sticky ? "sticky" : ""}`}>
            <div className="container">
               <div className="mega-menu-wrapper">
                  <div className="header-main">
                     <div className="header-left">
                        <div className="logo">
                           <Link to="/" className="header-logo">
                              <img src="/assets/img/logo/Starajin - Header  3x svg.svg" alt="Starajin Logo" />
                           </Link>
                        </div>
                     </div>
                     <div className="header-right d-flex justify-content-end align-items-center">
                        <div className="mean__menu-wrapper d-none d-xl-block">
                           <div className="main-menu">
                              <nav id="mobile-menu">
                                 <NavMenu />
                              </nav>
                           </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                           <div className="header__hamburger d-xl-none d-block my-auto">
                              <div className="sidebar__toggle" onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }}>
                                 <img src="/assets/img/icon/bars.png" alt="icon" />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="header-hamburger-inner d-xl-flex align-items-center d-none">
                        <LanguageSwitcher />
                        <Link to="/contact" className="theme-btn header-contact-btn text-nowrap style-white pe-20">
                           <i
                              className="fa-solid fa-arrow-right w-36 h-36 bg-white theme4-border rounded-circle d-center fz-14 theme-clr4"></i>
                           {t('nav.contact')}
                        </Link>
                        <div className="d-flex align-items-center gap-3">
                           <a
                              href={support.href}
                              onClick={onSupportClick}
                              className="d-flex align-items-center gap-3 header-support-link"
                              aria-label={support.label}
                              title={support.label}
                              rel="noreferrer"
                           >
                              {isKorean ? (
                                 <span className="header-support-icon header-support-icon--kakao" aria-hidden="true">
                                    K
                                 </span>
                              ) : (
                                 <i className="fa-brands fa-whatsapp header-support-icon header-support-icon--whatsapp" aria-hidden="true"></i>
                              )}
                              <span className="fw-normal d-xxl-block d-none header-support-text">
                                 24/7 Support <br />
                                 <span className="fw-600 text-nowrap header-support-subtext">
                                    {isKorean ? "KakaoTalk" : "WhatsApp"}
                                 </span>
                              </span>
                           </a>
                        </div>
                        <div className="header__hamburger my-auto d-xl-none d-block">
                           <div className="sidebar__toggle" onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }}>
                              <img src="/assets/img/icon/bars.png" alt="icon" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderOne
