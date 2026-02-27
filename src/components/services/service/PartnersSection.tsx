import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Partner {
   name: string;
   abbr: string;
}

const partnerLogos: Record<string, string> = {
   KOFICE: "/assets/img/partners/Korea Foundation for International Cultural Exchange (KOFICE).png",
   KOSME: "/assets/img/partners/Korea SMEs and Startups Agency (KOSME).png",
   KTO: "/assets/img/partners/Korea Tourism Organization (KTO).png",
   KOIMA: "/assets/img/partners/Korea Importers Association (KOIMA).png",
   CGK: "/assets/img/partners/Consulate General of the Republic of Korea in Mumbai.jpg",
   ICCK: "/assets/img/partners/ICCK (Indian Chamber of Commerce in Korea).jpg",
   MIDC: "/assets/img/partners/Maharashtra Industrial Development Corporation (MIDC).png",
   PCET: "/assets/img/partners/PCET (Pimpri Chinchwad Education Trust).png",
   PCU: "/assets/img/partners/Pimpri Chinchwad University.png",
   ICICI: "/assets/img/partners/ICICI Bank.png",
   IITR: "/assets/img/partners/IIT Roorkee Startup Center iHub Divya Sampark.png",
   GAM: "/assets/img/partners/Gradiant Asset Management (Gradiant Fund).png",
};

const PartnersSection = () => {
   const { t } = useTranslation();
   const [activeTab, setActiveTab] = useState<'kr' | 'in'>('kr');

   const rawKorea = t('services.partners.koreaPartners', { returnObjects: true });
   const rawIndia = t('services.partners.indiaPartners', { returnObjects: true });
   const koreaPartners: Partner[] = Array.isArray(rawKorea) ? rawKorea : [];
   const indiaPartners: Partner[] = Array.isArray(rawIndia) ? rawIndia : [];

   const partners = activeTab === 'kr' ? koreaPartners : indiaPartners;

   return (
      <>
         <style>{`
            .ptr-sec { padding: 80px 0; }

            /* ── Side-by-side layout: tabs left, logos right ── */
            .ptr-layout {
               display: flex;
               gap: 0;
               border: 1px solid rgba(0,0,0,0.08);
               border-radius: 16px;
               overflow: hidden;
               min-height: 400px;
               background: #ffffff;
            }

            /* ── Left: Tab nav ── */
            .ptr-nav {
               flex: 0 0 280px;
               background: #f8f9fb;
               border-right: 1px solid rgba(0,0,0,0.06);
               display: flex;
               flex-direction: column;
            }

            .ptr-tab {
               display: flex;
               align-items: center;
               gap: 14px;
               padding: 24px 24px;
               border: none;
               background: none;
               cursor: pointer;
               transition: all 0.3s ease;
               position: relative;
               text-align: left;
               border-bottom: 1px solid rgba(0,0,0,0.05);
            }
            .ptr-tab:last-child { border-bottom: none; }
            .ptr-tab:hover { background: rgba(2,62,218,0.03); }

            .ptr-tab--active {
               background: #ffffff !important;
            }
            .ptr-tab--active::before {
               content: '';
               position: absolute;
               left: 0;
               top: 0;
               bottom: 0;
               width: 3px;
               background: var(--theme, #023EDA);
               border-radius: 0 3px 3px 0;
            }

            .ptr-tab__flag {
               font-size: 28px;
               line-height: 1;
            }

            .ptr-tab__info { flex: 1; }
            .ptr-tab__title {
               font-size: 14px;
               font-weight: 700;
               color: #888;
               transition: color 0.3s ease;
            }
            .ptr-tab--active .ptr-tab__title {
               color: #1a1a2e;
            }
            .ptr-tab__sub {
               font-size: 11px;
               color: rgba(0,0,0,0.35);
               font-weight: 500;
               margin-top: 2px;
            }
            .ptr-tab--active .ptr-tab__sub {
               color: var(--theme, #023EDA);
            }

            .ptr-tab__arrow {
               font-size: 12px;
               color: rgba(0,0,0,0.15);
               transition: all 0.3s ease;
            }
            .ptr-tab--active .ptr-tab__arrow {
               color: var(--theme, #023EDA);
            }

            /* ── Right: Logo panel ── */
            .ptr-panel {
               flex: 1;
               padding: 32px;
               display: flex;
               flex-wrap: wrap;
               align-content: flex-start;
               gap: 16px;
               animation: ptrFade 0.3s ease;
            }
            @keyframes ptrFade {
               from { opacity: 0; }
               to { opacity: 1; }
            }

            .ptr-logo-card {
               flex: 0 0 calc(33.333% - 12px);
               background: #f8f9fb;
               border: 1px solid rgba(0,0,0,0.04);
               border-radius: 12px;
               padding: 20px 12px 14px;
               display: flex;
               flex-direction: column;
               align-items: center;
               text-align: center;
               gap: 10px;
               transition: all 0.3s ease;
            }
            .ptr-logo-card:hover {
               transform: translateY(-3px);
               box-shadow: 0 8px 24px rgba(0,0,0,0.07);
               background: #ffffff;
               border-color: rgba(2,62,218,0.1);
            }

            .ptr-logo-card__img {
               width: 120px;
               height: 60px;
               display: flex;
               align-items: center;
               justify-content: center;
            }
            .ptr-logo-card__img img {
               width: 100%;
               height: 100%;
               object-fit: contain;
            }

            .ptr-logo-card__name {
               font-size: 10px;
               font-weight: 600;
               color: #666;
               line-height: 1.4;
            }

            .ptr-logo-card__abbr {
               font-size: 18px;
               font-weight: 800;
               color: var(--theme, #023EDA);
               opacity: 0.2;
               letter-spacing: 1px;
            }

            /* ── Responsive ── */
            @media (max-width: 991px) {
               .ptr-layout {
                  flex-direction: column;
                  min-height: auto;
               }
               .ptr-nav {
                  flex: none;
                  flex-direction: row;
                  border-right: none;
                  border-bottom: 1px solid rgba(0,0,0,0.06);
               }
               .ptr-tab {
                  flex: 1;
                  padding: 16px 20px;
                  border-bottom: none;
                  justify-content: center;
               }
               .ptr-tab + .ptr-tab {
                  border-left: 1px solid rgba(0,0,0,0.05);
               }
               .ptr-tab--active::before {
                  left: 0;
                  right: 0;
                  top: auto;
                  bottom: 0;
                  width: auto;
                  height: 3px;
                  border-radius: 3px 3px 0 0;
               }
               .ptr-tab__arrow { display: none; }
               .ptr-panel { padding: 24px 20px; }
               .ptr-logo-card { flex: 0 0 calc(33.333% - 12px); }
            }
            @media (max-width: 767px) {
               .ptr-logo-card { flex: 0 0 calc(50% - 8px); }
               .ptr-panel { gap: 12px; padding: 20px 16px; }
            }
            @media (max-width: 575px) {
               .ptr-sec { padding: 60px 0; }
               .ptr-tab__flag { font-size: 22px; }
               .ptr-tab__title { font-size: 13px; }
               .ptr-tab__sub { font-size: 10px; }
               .ptr-logo-card__img { width: 90px; height: 48px; }
               .ptr-logo-card__name { font-size: 9px; }
               .ptr-logo-card { padding: 14px 10px 12px; }
            }
         `}</style>

         <section className="ptr-sec section-bg">
            <div className="container">
               {/* Header */}
               <div className="row mb-50 align-items-start">
                  <div className="col-lg-6">
                     <div className="section-header">
                        <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-lg-3 mb-2">
                           <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('services.partners.tag')}
                        </div>
                        <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".2s">
                           {t('services.partners.title')}
                        </h2>
                     </div>
                  </div>
                  <div className="col-lg-5 offset-lg-1">
                     <p className="wow fadeInUp" data-wow-delay=".3s"
                        style={{ opacity: 0.6, lineHeight: 1.7, paddingTop: '2rem' }}>
                        {t('services.partners.description')}
                     </p>
                  </div>
               </div>

               {/* Tabs left + Logos right */}
               <div className="ptr-layout">
                  {/* Left tabs */}
                  <div className="ptr-nav">
                     <button
                        className={`ptr-tab ${activeTab === 'kr' ? 'ptr-tab--active' : ''}`}
                        onClick={() => setActiveTab('kr')}
                     >
                        <span className="ptr-tab__flag">🇰🇷</span>
                        <div className="ptr-tab__info">
                           <div className="ptr-tab__title">{t('services.partners.koreaSide')}</div>
                           <div className="ptr-tab__sub">{t('services.partners.koreaSub')}</div>
                        </div>
                        <i className="fa-solid fa-chevron-right ptr-tab__arrow"></i>
                     </button>
                     <button
                        className={`ptr-tab ${activeTab === 'in' ? 'ptr-tab--active' : ''}`}
                        onClick={() => setActiveTab('in')}
                     >
                        <span className="ptr-tab__flag">🇮🇳</span>
                        <div className="ptr-tab__info">
                           <div className="ptr-tab__title">{t('services.partners.indiaSide')}</div>
                           <div className="ptr-tab__sub">{t('services.partners.indiaSub')}</div>
                        </div>
                        <i className="fa-solid fa-chevron-right ptr-tab__arrow"></i>
                     </button>
                  </div>

                  {/* Right: logo cards */}
                  <div className="ptr-panel" key={activeTab}>
                     {partners.map((p, idx) => (
                        <div key={idx} className="ptr-logo-card">
                           <div className="ptr-logo-card__img">
                              {partnerLogos[p.abbr] ? (
                                 <img src={partnerLogos[p.abbr]} alt={p.name} loading="lazy" />
                              ) : (
                                 <span className="ptr-logo-card__abbr">{p.abbr}</span>
                              )}
                           </div>
                           <span className="ptr-logo-card__name">{p.name}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default PartnersSection;
