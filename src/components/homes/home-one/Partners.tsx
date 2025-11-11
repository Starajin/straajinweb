import { useTranslation } from "react-i18next";

interface BrandType {
   id: number;
   logo: string;
   name: string;
}

const brand_data: BrandType[] = [
   {
      id: 1,
      logo: "/assets/img/brands/logo_01.png",
      name: "Strategic Partner 1"
   },
   {
      id: 2,
      logo: "/assets/img/brands/logo_02.png",
      name: "Technology Partner"
   },
   {
      id: 3,
      logo: "/assets/img/brands/logo_03.png",
      name: "Investment Partner"
   },
   {
      id: 4,
      logo: "/assets/img/brands/logo_04.png",
      name: "Government Client"
   },
   {
      id: 5,
      logo: "/assets/img/brands/logo_05.png",
      name: "Enterprise Client"
   },
   {
      id: 6,
      logo: "/assets/img/brands/logo_06.png",
      name: "Startup Client"
   },
   {
      id: 7,
      logo: "/assets/img/brands/logo_07.png",
      name: "Financial Partner"
   },
   {
      id: 8,
      logo: "/assets/img/brands/logo_08.png",
      name: "Consulting Partner"
   },
   {
      id: 9,
      logo: "/assets/img/brands/logo_09.png",
      name: "Manufacturing Client"
   },
   {
      id: 10,
      logo: "/assets/img/brands/logo_10.png",
      name: "Technology Client"
   },
   {
      id: 11,
      logo: "/assets/img/brands/logo_11.png",
      name: "Trade Partner"
   },
   {
      id: 12,
      logo: "/assets/img/brands/logo_12.png",
      name: "Innovation Partner"
   }
];

const Partners = () => {
   const { t } = useTranslation();
   // Triple the brand data for seamless infinite loop
   const duplicatedBrands = [...brand_data, ...brand_data, ...brand_data];

   const marqueeStyle = {
      overflow: 'hidden',
      whiteSpace: 'nowrap' as const,
      width: '100%',
      background: 'transparent',
      padding: '1.5rem 0'
   };

   const contentStyle = {
      display: 'inline-flex',
      animation: 'marqueeScroll 30s linear infinite',
      gap: '2rem',
      alignItems: 'center'
   };

   const itemStyle = {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '150px',
      height: '60px'
   };

   const imgStyle = {
      maxHeight: '45px',
      maxWidth: '130px',
      objectFit: 'contain' as const,
      filter: 'grayscale(60%) opacity(0.8)',
      transition: 'all 0.3s ease',
      imageRendering: 'crisp-edges' as const,
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const,
      backfaceVisibility: 'hidden' as const,
      WebkitBackfaceVisibility: 'hidden' as const,
      transform: 'translateZ(0)',
      WebkitTransform: 'translateZ(0)',
      willChange: 'transform, filter'
   };

   return (
      <>
         <style>
            {`
            @keyframes marqueeScroll {
               0% { transform: translateX(0); }
               100% { transform: translateX(-50%); }
            }
            
            .partner-logo-sharp {
               image-rendering: -webkit-optimize-contrast !important;
               image-rendering: -moz-crisp-edges !important;
               image-rendering: crisp-edges !important;
               image-rendering: pixelated !important;
               -webkit-font-smoothing: antialiased !important;
               -moz-osx-font-smoothing: grayscale !important;
               transform: translateZ(0) !important;
               backface-visibility: hidden !important;
               perspective: 1000px !important;
            }
            
            .partner-logo-sharp:hover {
               filter: grayscale(0%) opacity(1) contrast(1.1) brightness(1.05) !important;
               transform: translateZ(0) scale(1.02) !important;
            }
            `}
         </style>
         <section className="partners-section partners-with-bg" style={{paddingTop: '20px', paddingBottom: '20px', marginTop: '80px'}}>
            <div className="container">
               <div className="row g-sm-4 g-3 align-items-end mb-20">
                  <div className="col-lg-6 col-md-7">
                     <div className="section-header">
                        <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                           <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('partners.title')}
                        </div>
                        <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                           {t('partners.subtitle')}
                        </h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <div className="partners-wrapper">
                        <div style={marqueeStyle}>
                           <div style={contentStyle}>
                              {duplicatedBrands.map((brand, index) => (
                                 <div key={`${brand.id}-${index}`} style={itemStyle}>
                                    <img 
                                       src={brand.logo} 
                                       alt={brand.name}
                                       style={imgStyle}
                                       className="partner-logo-sharp"
                                    />
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}

export default Partners