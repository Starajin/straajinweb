import NavMenu from "./Menu/NavMenu"
import { useState } from "react";
import Offcanvas from "./Menu/Offcanvas";
import UseSticky from "../../hooks/UseSticky";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const HeaderOne = () => {

   const { sticky } = UseSticky();
   const { t } = useTranslation();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

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
                        <Link to="/contact" className="theme-btn text-nowrap style-white pe-20">
                           <i
                              className="fa-solid fa-arrow-right w-36 h-36 bg-white theme4-border rounded-circle d-center fz-14 theme-clr4"></i>
                           {t('nav.contact')}
                        </Link>
                        <div className="d-flex align-items-center gap-3">
                           <i className="fa-solid fa-phone w-48 h-48 rounded-circle d-center header-phone-icon"></i>
                           <Link to="tel:+11002345909" className="fw-normal d-xxl-block d-none" style={{ color: '#333' }}>
                              24/7 Support <br />
                              <span className="fw-600 text-nowrap" style={{ color: '#023EDA' }}>(++597)678 09876</span>
                           </Link>
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
