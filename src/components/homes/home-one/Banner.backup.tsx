import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

interface Slide {
   titleKey: string;
   subtitleKey: string;
   descriptionKey: string;
   ctaKey: string;
   backgroundImage: string;
   featuresKey: string[];
   graphic: string;
}

const Banner = () => {
   const { t } = useTranslation();
   const slide: Slide = {
      titleKey: "banner.slide1.title",
      subtitleKey: "banner.slide1.subtitle",
      descriptionKey: "banner.slide1.description",
      ctaKey: "banner.slide1.cta",
      backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      featuresKey: [
         "banner.slide1.features.0",
         "banner.slide1.features.1",
         "banner.slide1.features.2",
         "banner.slide1.features.3",
      ],
      graphic: "market-entry",
   };

   return (
      <>
         {/* Hero Slider Section */}
         <section className="banner-section style1 position-relative overflow-hidden" 
                  style={{ 
                     height: '100vh',
                     minHeight: '700px',
                     paddingTop: '75px'
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
                  <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>

                  {/* Optional Subtle Pattern Overlay */}
                  <div
                     className="position-absolute w-100 h-100"
                     style={{
                        background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.2))',
                     }}
                  ></div>

                  <div className="position-relative h-100 d-flex align-items-center" style={{ zIndex: 20 }}>
                     <div className="container-fluid" style={{ maxWidth: '1200px' }}>
                        <div className="row g-4 g-lg-5 align-items-center">
                           {/* Content - Left Side */}
                           <div className="col-lg-6">
                              <div className="text-white text-center text-lg-start">
                                 {/* Main Title */}
                                 <div className="mb-4 mb-lg-5">
                                    <h1
                                       className="fw-bold mb-2 text-white"
                                       style={{
                                          fontSize: 'clamp(2rem, 5vw, 4rem)',
                                          lineHeight: 1.2,
                                          fontFamily: 'Malgun Gothic, sans-serif',
                                          color: '#ffffff',
                                       }}
                                    >
                                       {t(slide.titleKey)}
                                    </h1>
                                    <h2
                                       className="fw-bold"
                                       style={{
                                          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                                          color: 'var(--hero-subtitle-color)',
                                          wordBreak: 'break-word',
                                          fontFamily: 'Malgun Gothic, sans-serif',
                                       }}
                                    >
                                       {t(slide.subtitleKey)}
                                    </h2>
                                 </div>

                                 {/* Description */}
                                 <p
                                    className="mb-4 mb-lg-5"
                                    style={{
                                       fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                                       color: 'rgba(255,255,255,0.9)',
                                       lineHeight: 1.6,
                                       maxWidth: '32rem',
                                       margin: '0 auto',
                                       fontWeight: 'normal',
                                    }}
                                 >
                                    {t(slide.descriptionKey)}
                                 </p>

                                 {/* CTA Button */}
                                 <div className="pt-3">
                                    <Link
                                       to="/contact"
                                       className="btn d-inline-flex align-items-center justify-content-center px-4 px-lg-5 py-3 py-lg-4 fw-semibold rounded-3 text-white text-decoration-none hero-cta-btn"
                                       style={{
                                          backgroundColor: 'var(--hero-cta-bg)',
                                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                          transition: 'all 0.3s ease',
                                       }}
                                    >
                                       {t(slide.ctaKey)}
                                       <i
                                          className="fa-light fa-arrow-right ms-2 hero-arrow"
                                          style={{
                                             fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                             transition: 'transform 0.3s ease',
                                          }}
                                       ></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>

                           {/* Features Grid - Right Side */}
                           <div className="col-lg-6 d-none d-md-block">
                              <div className="row g-3 g-lg-4">
                                 {slide.featuresKey.map((featureKey, featureIndex) => (
                                    <div key={featureIndex} className="col-sm-6">
                                       <div
                                          className="p-3 p-lg-4 rounded-3 feature-card"
                                          style={{
                                             backgroundColor: 'rgba(255,255,255,0.2)',
                                             backdropFilter: 'blur(16px)',
                                             border: '1px solid rgba(255,255,255,0.3)',
                                             transition: 'all 0.3s ease',
                                          }}
                                       >
                                          <div className="d-flex align-items-center justify-content-between mb-2">
                                             <div
                                                style={{
                                                   width: 'clamp(6px, 1.5vw, 8px)',
                                                   height: 'clamp(6px, 1.5vw, 8px)',
                                                   backgroundColor: 'var(--hero-dot-color)',
                                                   borderRadius: '50%',
                                                }}
                                             ></div>
                                             <div
                                                className="feature-icon-container"
                                                style={{
                                                   width: 'clamp(20px, 5vw, 24px)',
                                                   height: 'clamp(20px, 5vw, 24px)',
                                                   border: '1px solid rgba(255,255,255,0.4)',
                                                   borderRadius: '4px',
                                                   transition: 'border-color 0.3s ease',
                                                }}
                                             >
                                                <div className="w-100 h-100 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                             </div>
                                          </div>
                                          <h4
                                             className="text-white fw-semibold mb-2"
                                             style={{
                                                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                                                lineHeight: 1.3,
                                                fontFamily: 'Malgun Gothic, sans-serif',
                                             }}
                                          >
                                             {t(featureKey)}
                                          </h4>
                                          <div
                                             style={{
                                                height: '2px',
                                                background: 'var(--hero-line-gradient)',
                                                borderRadius: '1px',
                                             }}
                                          ></div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Custom Styles for Enhanced Interactions */}
         <style>{`
            @media (min-width: 576px) {
               .banner-section.style1 {
                  height: 70vh !important;
                  min-height: 700px !important;
               }
            }
            
            @media (min-width: 768px) {
               .banner-section.style1 {
                  height: 80vh !important;
                  min-height: 800px !important;
               }
            }
            
            @media (min-width: 992px) {
               .banner-section.style1 {
                  min-height: 100vh !important;
               }
            }
            
            .hero-cta-btn:hover {
               background-color: var(--hero-cta-hover-bg) !important;
               box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15) !important;
               transform: translateY(-2px);
            }
            
            .hero-arrow {
               transition: transform 0.3s ease;
            }
            
            .hero-cta-btn:hover .hero-arrow {
               transform: translateX(4px);
            }
            
            .feature-card:hover {
               background-color: rgba(255,255,255,0.3) !important;
            }
            
            .feature-card:hover .feature-icon-container {
               border-color: var(--hero-dot-color) !important;
            }
         `}</style>
      </>
   )
}

export default Banner
