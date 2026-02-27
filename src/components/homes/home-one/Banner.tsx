import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

const Banner = () => {
   const { t } = useTranslation();

   const backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

   return (
      <>
         <section
            className="banner-section style1 position-relative overflow-hidden"
            style={{ height: '85vh', minHeight: '560px', maxHeight: '750px', paddingTop: 0 }}
         >
            {/* Background */}
            <div className="position-absolute w-100 h-100 top-0 start-0" style={{ zIndex: 1 }}>
               <div
                  className="w-100 h-100"
                  style={{
                     backgroundImage: `url(${backgroundImage})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                  }}
               />
               <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 100%)' }} />
            </div>

            {/* Content */}
            <div className="position-relative h-100 d-flex align-items-center" style={{ zIndex: 2 }}>
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-lg-9 col-xl-7 text-center">

                        {/* H1 */}
                        <h1 className="hero-h1 text-white mb-3">
                           {t('banner.slide1.title')}
                           <span className="hero-h1__accent"> {t('banner.slide1.subtitle')}</span>
                        </h1>

                        {/* H2 / subtitle */}
                        <p className="hero-h2 text-white mb-4">
                           {t('banner.slide1.h2')}
                        </p>

                        {/* CTAs */}
                        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
                           <Link to="/contact" className="hero-btn hero-btn--primary">
                              {t('banner.slide1.cta')}
                              <i className="fa-solid fa-arrow-right ms-2 hero-btn__arrow" />
                           </Link>
                           <Link to="/services" className="hero-btn hero-btn--ghost">
                              {t('banner.slide1.cta2')}
                              <i className="fa-solid fa-arrow-right ms-2 hero-btn__arrow" />
                           </Link>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </section>

         <style>{`
            /* ── Hero typography ── */
            .hero-h1 {
               font-size: clamp(1.75rem, 3.5vw, 2.8rem);
               font-weight: 800;
               line-height: 1.2;
               letter-spacing: -0.02em;
            }
            .hero-h1__accent {
               color: var(--hero-subtitle-color, #F59E0B);
               display: inline;
            }

            .hero-h2 {
               font-size: clamp(0.95rem, 1.4vw, 1.1rem);
               font-weight: 400;
               line-height: 1.7;
               color: rgba(255,255,255,0.88);
               max-width: 640px;
               margin-left: auto;
               margin-right: auto;
            }

            /* ── Hero buttons ── */
            .hero-btn {
               display: inline-flex;
               align-items: center;
               justify-content: center;
               padding: 10px 20px;
               font-size: 14px;
               font-weight: 500;
               border-radius: 6px;
               text-decoration: none;
               white-space: nowrap;
               transition: all 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
               cursor: pointer;
               border: none;
            }
            .hero-btn__arrow {
               font-size: 12px;
               transition: transform 0.3s ease;
            }
            .hero-btn:hover .hero-btn__arrow {
               transform: translateX(4px);
            }

            .hero-btn--primary {
               background: var(--hero-cta-bg, #1E3A8A);
               color: #fff;
               box-shadow: 0 4px 16px rgba(30,58,138,0.35);
            }
            .hero-btn--primary:hover {
               background: var(--hero-cta-hover-bg, #F59E0B);
               color: #fff;
               transform: translateY(-2px);
               box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            }

            .hero-btn--ghost {
               background: transparent;
               color: #fff;
               border: 1.5px solid rgba(255,255,255,0.35);
            }
            .hero-btn--ghost:hover {
               background: rgba(255,255,255,0.1);
               border-color: #fff;
               color: #fff;
               transform: translateY(-2px);
            }

            /* ── Section height ── */
            @media (max-width: 575px) {
               .banner-section.style1 { height: auto !important; min-height: unset !important; max-height: unset !important; padding: 80px 0 48px !important; }
               .hero-h1 { font-size: 1.5rem; }
               .hero-h2 { font-size: 0.9rem; }
               .hero-btn { width: auto; padding: 9px 18px; font-size: 13px; }
            }
            @media (min-width: 576px) and (max-width: 767px) {
               .banner-section.style1 { height: 60vh !important; min-height: 400px !important; max-height: 520px !important; }
            }
            @media (min-width: 768px) and (max-width: 991px) {
               .banner-section.style1 { height: 70vh !important; min-height: 460px !important; max-height: 600px !important; }
            }
            @media (min-width: 992px) {
               .banner-section.style1 { height: 85vh !important; min-height: 560px !important; max-height: 750px !important; }
            }
         `}</style>
      </>
   )
}

export default Banner
