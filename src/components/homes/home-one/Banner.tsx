import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

interface Slide {
   titleKey: string;
   subtitleKey: string;
   descriptionKey: string;
   ctaKey: string;
   backgroundImage: string;
}

const Banner = () => {
   const { t } = useTranslation();
   const slide: Slide = {
      titleKey: "banner.slide1.title",
      subtitleKey: "banner.slide1.subtitle",
      descriptionKey: "banner.slide1.description",
      ctaKey: "banner.slide1.cta",
      backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
   };

   return (
      <>
         {/* Hero Banner Section */}
         <section className="banner-section style1 position-relative overflow-hidden" 
                  style={{ 
                     height: '100vh',
                     minHeight: '600px',
                     paddingTop: '70px'
                  }}>
            <div className="position-relative w-100 h-100">
               <div
                  className="position-absolute w-100 h-100"
                  style={{
                     backgroundImage: `url(${slide.backgroundImage})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     zIndex: 10,
                  }}
               >
                  {/* Dark Overlay for Content Visibility */}
                  <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}></div>

                  {/* Gradient Overlay */}
                  <div
                     className="position-absolute w-100 h-100"
                     style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
                     }}
                  ></div>

                  <div className="position-relative h-100 d-flex align-items-center" style={{ zIndex: 20 }}>
                     <div className="container">
                        <div className="row justify-content-center">
                           {/* Centered Content */}
                           <div className="col-lg-10 col-xl-8">
                              <div className="text-white text-center">
                                 {/* Main Title */}
                                 <div className="mb-4">
                                    <h1
                                       className="fw-bold mb-0 text-white"
                                       style={{
                                          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                          lineHeight: 1.3,
                                       }}
                                    >
                                       {t(slide.titleKey)}{' '}
                                       <span style={{ color: 'var(--hero-subtitle-color)' }}>
                                          {t(slide.subtitleKey)}
                                       </span>
                                    </h1>
                                 </div>

                                 {/* Description */}
                                 <p
                                    className="mx-auto mb-4"
                                    style={{
                                       fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
                                       color: 'rgba(255,255,255,0.9)',
                                       lineHeight: 1.6,
                                       maxWidth: '550px',
                                    }}
                                 >
                                    {t(slide.descriptionKey)}
                                 </p>

                                 {/* CTA Button */}
                                 <div>
                                    <Link
                                       to="/contact"
                                       className="btn d-inline-flex align-items-center justify-content-center px-4 py-3 fw-semibold rounded-pill text-white text-decoration-none hero-cta-btn"
                                       style={{
                                          backgroundColor: 'var(--hero-cta-bg)',
                                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                          transition: 'all 0.3s ease',
                                          fontSize: '1rem',
                                       }}
                                    >
                                       {t(slide.ctaKey)}
                                       <i
                                          className="fa-light fa-arrow-right ms-2 hero-arrow"
                                          style={{ transition: 'transform 0.3s ease' }}
                                       ></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Custom Styles */}
         <style>{`
            @media (min-width: 576px) {
               .banner-section.style1 {
                  height: 80vh !important;
                  min-height: 550px !important;
               }
            }
            
            @media (min-width: 992px) {
               .banner-section.style1 {
                  height: 85vh !important;
                  min-height: 600px !important;
               }
            }
            
            .hero-cta-btn:hover {
               background-color: var(--hero-cta-hover-bg) !important;
               box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
               transform: translateY(-3px);
            }
            
            .hero-cta-btn:hover .hero-arrow {
               transform: translateX(5px);
            }
         `}</style>
      </>
   )
}

export default Banner
