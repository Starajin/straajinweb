import { useTranslation } from "react-i18next";

interface BrandType {
   id: number;
   logo: string;
   name: string;
}

const brand_data: BrandType[] = [
   { id: 1, logo: "/assets/img/clients/gs-caltex.jpg", name: "GS Caltex" },
   { id: 2, logo: "/assets/img/clients/kofice.png", name: "KOFICE" },
   { id: 3, logo: "/assets/img/clients/koima.jpg", name: "KOIMA" },
   { id: 4, logo: "/assets/img/clients/gjfez.jpg", name: "GJFEZ" },
   { id: 5, logo: "/assets/img/clients/nami-island.png", name: "Nami Island" },
   { id: 6, logo: "/assets/img/clients/rossari-biotech.png", name: "Rossari Biotech" },
   { id: 7, logo: "/assets/img/clients/sandu-pharmaceuticals.png", name: "Sandu Pharmaceuticals" },
   { id: 8, logo: "/assets/img/clients/logisall.png", name: "Logisall" },
   { id: 9, logo: "/assets/img/clients/sekyung.png", name: "Sekyung" },
   { id: 10, logo: "/assets/img/clients/miretech.png", name: "Miretech" },
   { id: 11, logo: "/assets/img/clients/softlanders.png", name: "Softlanders" },
   { id: 12, logo: "/assets/img/clients/e4com.jpeg", name: "E4com" },
   { id: 13, logo: "/assets/img/clients/beaulab-korea.jpeg", name: "Beaulab Korea" },
   { id: 14, logo: "/assets/img/clients/buja-tape.jpeg", name: "Buja Tape" },
   { id: 15, logo: "/assets/img/clients/cursus-bio.jpeg", name: "Cursus Bio" },
   { id: 16, logo: "/assets/img/clients/dongwoo-electric.jpg", name: "Dongwoo Electric" },
   { id: 17, logo: "/assets/img/clients/ecowave.jpg", name: "Ecowave" },
   { id: 18, logo: "/assets/img/clients/ink.jpg", name: "INK" },
   { id: 19, logo: "/assets/img/clients/jagruti-technical.jpeg", name: "Jagruti Technical" },
   { id: 20, logo: "/assets/img/clients/lanbell-cosmetics.jpg", name: "Lanbell Cosmetics" },
   { id: 21, logo: "/assets/img/clients/maison-india.jpg", name: "Maison India" },
   { id: 22, logo: "/assets/img/clients/pcu.png", name: "PCU" },
   { id: 23, logo: "/assets/img/clients/pcet-trust.jpg", name: "PCET Trust" },
   { id: 24, logo: "/assets/img/clients/rf-chemical.png", name: "R&F Chemical" },
   { id: 25, logo: "/assets/img/clients/rem-magnetics.png", name: "REM Magnetics" },
   { id: 26, logo: "/assets/img/clients/rmk-spaces.jpeg", name: "RMK Spaces" },
   { id: 27, logo: "/assets/img/clients/ambani-tiles.png", name: "Ambani Tiles" },
   { id: 28, logo: "/assets/img/clients/softberry.avif", name: "Softberry" },
   { id: 29, logo: "/assets/img/clients/the-plan-g.jpeg", name: "The Plan G" },
   { id: 30, logo: "/assets/img/clients/yw-mobile.png", name: "YW Mobile" },
   { id: 31, logo: "/assets/img/clients/kakao-client.jpg", name: "Kakao Client" },
   { id: 32, logo: "/assets/img/clients/lipid-logo.png", name: "Lipid" },
   { id: 33, logo: "/assets/img/clients/berryworz.jpg", name: "Berryworz" },
];

const Partners = () => {
   const { t } = useTranslation();

   // Split logos into two rows for dual-track marquee
   const midpoint = Math.ceil(brand_data.length / 2);
   const row1 = brand_data.slice(0, midpoint);
   const row2 = brand_data.slice(midpoint);

   // Duplicate each row for seamless loop
   const track1 = [...row1, ...row1];
   const track2 = [...row2, ...row2];

   return (
      <>
         <style>
            {`
            @keyframes marqueeLeft {
               0% { transform: translateX(0); }
               100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
               0% { transform: translateX(-50%); }
               100% { transform: translateX(0); }
            }

            .partners-marquee {
               position: relative;
               overflow: hidden;
               width: 100%;
            }
            .partners-marquee::before,
            .partners-marquee::after {
               content: '';
               position: absolute;
               top: 0;
               bottom: 0;
               width: 100px;
               z-index: 2;
               pointer-events: none;
            }
            .partners-marquee::before {
               left: 0;
               background: linear-gradient(90deg, var(--white, #fff) 0%, transparent 100%);
            }
            .partners-marquee::after {
               right: 0;
               background: linear-gradient(270deg, var(--white, #fff) 0%, transparent 100%);
            }

            .partners-track {
               display: inline-flex;
               gap: 3rem;
               align-items: center;
               padding: 12px 0;
            }
            .partners-track--left {
               animation: marqueeLeft 40s linear infinite;
            }
            .partners-track--right {
               animation: marqueeRight 45s linear infinite;
            }
            .partners-track:hover {
               animation-play-state: paused;
            }

            .partner-logo-item {
               flex-shrink: 0;
               display: flex;
               align-items: center;
               justify-content: center;
               width: 140px;
               height: 56px;
               background: #fff;
               border-radius: 8px;
               padding: 8px 12px;
               border: 1px solid rgba(0,0,0,0.06);
            }

            .partner-logo-sharp {
               max-height: 40px;
               max-width: 120px;
               width: auto;
               height: auto;
               object-fit: contain;
               image-rendering: auto;
               transition: all 0.4s ease;
            }
            .partner-logo-item:hover .partner-logo-sharp {
               transform: scale(1.05);
            }
            `}
         </style>
         <section className="partners-section partners-with-bg" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
            <div className="container">
               <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-1" style={{ fontSize: '13px' }}>
                  <img src="/assets/img/icon/section-step1.png" alt="img" style={{ width: '16px', height: '16px' }} /> {t('partners.title')}
               </div>
               <h4 className="theme-clr4 fw-bold mb-3">{t('partners.subtitle')}</h4>
               <div className="row">
                  <div className="col-12">
                     <div className="partners-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {/* Row 1 — scrolls left */}
                        <div className="partners-marquee">
                           <div className="partners-track partners-track--left">
                              {track1.map((brand, index) => (
                                 <div key={`r1-${brand.id}-${index}`} className="partner-logo-item">
                                    <img
                                       src={brand.logo}
                                       alt={brand.name}
                                       className="partner-logo-sharp"
                                       loading="lazy"
                                    />
                                 </div>
                              ))}
                           </div>
                        </div>
                        {/* Row 2 — scrolls right */}
                        <div className="partners-marquee">
                           <div className="partners-track partners-track--right">
                              {track2.map((brand, index) => (
                                 <div key={`r2-${brand.id}-${index}`} className="partner-logo-item">
                                    <img
                                       src={brand.logo}
                                       alt={brand.name}
                                       className="partner-logo-sharp"
                                       loading="lazy"
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