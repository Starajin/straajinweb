import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { getTranslatedArray } from "../../../utils/i18n";

const capabilities = [
   {
      icon: "fa-solid fa-building-columns",
      titleKey: "services.overview.businessEntry.title",
      itemsKey: "services.overview.businessEntry.items",
      color: "#1E3A8A",
   },
   {
      icon: "fa-solid fa-chart-line",
      titleKey: "services.overview.investment.title",
      itemsKey: "services.overview.investment.items",
      color: "#047857",
   },
   {
      icon: "fa-solid fa-handshake",
      titleKey: "services.overview.b2bPartner.title",
      itemsKey: "services.overview.b2bPartner.items",
      color: "#C2410C",
   },
   {
      icon: "fa-solid fa-chess-queen",
      titleKey: "services.overview.strategy.title",
      itemsKey: "services.overview.strategy.items",
      color: "#7C3AED",
   },
   {
      icon: "fa-solid fa-database",
      titleKey: "services.overview.businessData.title",
      itemsKey: "services.overview.businessData.items",
      color: "#0891B2",
   },
   {
      icon: "fa-solid fa-palette",
      titleKey: "services.overview.cultural.title",
      itemsKey: "services.overview.cultural.items",
      color: "#BE185D",
   },
];

const ServiceTagline = () => {
   const { t } = useTranslation();

   return (
      <>
         <style>{`
            .svc-cap {
               padding: 80px 0;
               background: #ffffff;
            }

            .svc-cap__card {
               background: #ffffff;
               border: 1px solid rgba(0,0,0,0.08);
               border-radius: 16px;
               padding: 28px 24px;
               height: 100%;
               transition: all 0.35s ease;
               position: relative;
               border-left: 3px solid transparent;
            }
            .svc-cap__card:hover {
               transform: translateY(-4px);
               box-shadow: 0 12px 32px rgba(0,0,0,0.08);
            }

            .svc-cap__icon-wrap {
               width: 48px;
               height: 48px;
               border-radius: 12px;
               display: flex;
               align-items: center;
               justify-content: center;
               margin-bottom: 20px;
               transition: transform 0.3s ease;
            }
            .svc-cap__card:hover .svc-cap__icon-wrap {
               transform: scale(1.08);
            }
            .svc-cap__icon-wrap i {
               font-size: 20px;
            }

            .svc-cap__title {
               font-size: 16px !important;
               font-weight: 700;
               color: #1a1a2e;
               margin-bottom: 14px;
               line-height: 1.35;
            }

            .svc-cap__list {
               list-style: none;
               padding: 0;
               margin: 0 0 16px 0;
               display: flex;
               flex-direction: column;
               gap: 8px;
            }
            .svc-cap__list li {
               display: flex;
               align-items: flex-start;
               gap: 10px;
               font-size: 14px;
               color: rgba(0,0,0,0.55);
               line-height: 1.5;
            }
            .svc-cap__list li i {
               font-size: 8px;
               margin-top: 6px;
               flex-shrink: 0;
            }

            .svc-cap__arrow {
               position: absolute;
               bottom: 20px;
               right: 20px;
               font-size: 14px;
               opacity: 0;
               transform: translateX(-4px);
               transition: all 0.3s ease;
            }
            .svc-cap__card:hover .svc-cap__arrow {
               opacity: 1;
               transform: translateX(0);
            }

            @media (max-width: 767px) {
               .svc-cap {
                  padding: 60px 0;
               }
               .svc-cap__card {
                  padding: 24px 20px;
               }
            }
         `}</style>

         <section className="svc-cap">
            <div className="container">
               {/* Header */}
               <div className="row mb-50 align-items-start">
                  <div className="col-lg-6">
                     <div className="section-header">
                        <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                           <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('services.capabilities.tag')}
                        </div>
                        <h2 className="theme-clr4 fw-bold">
                           {t('services.overview.title')}
                        </h2>
                     </div>
                  </div>
                  <div className="col-lg-5 offset-lg-1">
                     <p style={{ opacity: 0.6, lineHeight: 1.7, paddingTop: '1.5rem' }}>
                        {t('services.overview.description')}
                     </p>
                  </div>
               </div>

               {/* Cards Grid */}
               <div className="row g-4">
                  {capabilities.map((cap, i) => (
                     <div key={i} className="col-lg-4 col-md-6">
                        <motion.div
                           className="svc-cap__card"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, amount: 0.15 }}
                           transition={{ duration: 0.45, delay: i * 0.08 }}
                           style={{
                              borderLeftColor: 'transparent',
                           }}
                           onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderLeftColor = cap.color;
                           }}
                           onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent';
                           }}
                        >
                           {/* Icon */}
                           <div
                              className="svc-cap__icon-wrap"
                              style={{
                                 background: `${cap.color}12`,
                              }}
                           >
                              <i className={cap.icon} style={{ color: cap.color }} />
                           </div>

                           {/* Title */}
                           <h4 className="svc-cap__title">{t(cap.titleKey)}</h4>

                           {/* Items */}
                           <ul className="svc-cap__list">
                              {getTranslatedArray(t, cap.itemsKey).map((item, idx) => (
                                 <li key={idx}>
                                    <i className="fa-solid fa-check" style={{ color: cap.color }} />
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>

                           {/* Arrow */}
                           <div className="svc-cap__arrow" style={{ color: cap.color }}>
                              <i className="fa-solid fa-arrow-right" />
                           </div>
                        </motion.div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default ServiceTagline;
