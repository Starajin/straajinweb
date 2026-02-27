import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface StepData {
   title: string;
   intro: string;
   bullets: string[];
   closing: string;
}

const Integration = () => {
   const { t } = useTranslation();

   const rawSteps = t('integration.steps', { returnObjects: true });
   const steps: StepData[] = Array.isArray(rawSteps) ? rawSteps : [];

   const rawHighlights = t('integration.highlights', { returnObjects: true });
   const highlights: string[] = Array.isArray(rawHighlights) ? rawHighlights : [];

   return (
      <section className="intg-corp">
         <div className="container">

            {/* Header */}
            <div className="row mb-5">
               <div className="col-lg-7">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                  >
                     <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="intg-corp__bar" />
                        <span className="intg-corp__eyebrow">{t('integration.eyebrow')}</span>
                     </div>
                     <h2 className="intg-corp__title">{t('integration.title')}</h2>
                     <p className="intg-corp__lead">{t('integration.lead')}</p>
                  </motion.div>
               </div>
            </div>

            {/* Steps grid — 2×2 */}
            <div className="row g-4 mb-5">
               {steps.map((step, i) => (
                  <div key={i} className="col-lg-6">
                     <motion.div
                        className="intg-corp__card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55, delay: i * 0.1 }}
                     >
                        <div className="intg-corp__card-num">
                           {String(i + 1).padStart(2, '0')}
                        </div>
                        <h3 className="intg-corp__card-title">{step.title}</h3>
                        <p className="intg-corp__card-desc">{step.intro}</p>

                        {step.bullets?.length > 0 && (
                           <ul className="intg-corp__card-list">
                              {step.bullets.map((b, j) => (
                                 <li key={j}>
                                    <i className="fa-solid fa-check" />
                                    <span>{b}</span>
                                 </li>
                              ))}
                           </ul>
                        )}

                        <p className="intg-corp__card-closing">{step.closing}</p>
                     </motion.div>
                  </div>
               ))}
            </div>

            {/* Highlights row */}
            <motion.div
               className="intg-corp__highlights"
               initial={{ opacity: 0, y: 16 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
            >
               {highlights.map((h, i) => (
                  <div key={i} className="intg-corp__hl-item">
                     <i className="fa-solid fa-diamond" />
                     <span>{h}</span>
                  </div>
               ))}
            </motion.div>

            {/* CTA */}
            <motion.div
               className="text-center mt-5"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.3 }}
            >
               <Link to="/services" className="intg-corp__cta">
                  {t('integration.cta')}
                  <i className="fa-solid fa-arrow-right" />
               </Link>
            </motion.div>
         </div>

         <style>{`
            .intg-corp {
               padding: 100px 0 160px;
               background: linear-gradient(170deg, #0f1b3d 0%, #162550 40%, #1a2d5e 100%);
               position: relative;
               overflow: hidden;
            }
            .intg-corp::before {
               content: '';
               position: absolute;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               background: radial-gradient(ellipse at 20% 0%, rgba(30,58,138,0.3) 0%, transparent 60%),
                           radial-gradient(ellipse at 80% 100%, rgba(245,158,11,0.06) 0%, transparent 50%);
               pointer-events: none;
            }

            /* ── Header ── */
            .intg-corp__bar {
               width: 32px;
               height: 3px;
               background: var(--theme2, #F59E0B);
               border-radius: 2px;
            }
            .intg-corp__eyebrow {
               font-size: 13px;
               font-weight: 600;
               letter-spacing: 0.08em;
               text-transform: uppercase;
               color: var(--theme2, #F59E0B);
            }
            .intg-corp__title {
               font-size: clamp(1.6rem, 3vw, 2.4rem) !important;
               font-weight: 700;
               line-height: 1.3;
               color: #ffffff;
               margin-bottom: 16px;
               word-break: keep-all;
            }
            .intg-corp__lead {
               font-size: 14.5px;
               line-height: 1.7;
               color: rgba(255,255,255,0.6);
               max-width: 560px;
            }

            /* ── Cards ── */
            .intg-corp__card {
               background: rgba(255,255,255,0.04);
               border: 1px solid rgba(255,255,255,0.08);
               border-radius: 16px;
               padding: 32px 28px;
               height: 100%;
               transition: all 0.35s ease;
               position: relative;
            }
            .intg-corp__card:hover {
               background: rgba(255,255,255,0.07);
               border-color: rgba(255,255,255,0.14);
               transform: translateY(-4px);
               box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            }

            .intg-corp__card-num {
               font-size: 36px;
               font-weight: 800;
               color: rgba(255,255,255,0.08);
               line-height: 1;
               margin-bottom: 20px;
               letter-spacing: -0.02em;
            }
            .intg-corp__card:hover .intg-corp__card-num {
               color: rgba(245,158,11,0.2);
            }

            .intg-corp__card-title {
               font-size: 17px !important;
               font-weight: 700;
               color: #ffffff;
               line-height: 1.4;
               margin-bottom: 10px;
               word-break: keep-all;
            }
            .intg-corp__card-desc {
               font-size: 14px;
               line-height: 1.65;
               color: rgba(255,255,255,0.55);
               margin-bottom: 16px;
            }

            .intg-corp__card-list {
               list-style: none;
               padding: 0;
               margin: 0 0 16px 0;
               display: flex;
               flex-direction: column;
               gap: 8px;
            }
            .intg-corp__card-list li {
               display: flex;
               align-items: flex-start;
               gap: 8px;
               font-size: 14px;
               color: rgba(255,255,255,0.7);
               line-height: 1.5;
            }
            .intg-corp__card-list li i {
               font-size: 10px;
               color: var(--theme2, #F59E0B);
               margin-top: 4px;
               flex-shrink: 0;
            }

            .intg-corp__card-closing {
               font-size: 14px;
               font-weight: 600;
               color: var(--theme2, #F59E0B);
               line-height: 1.55;
               margin: 0;
               padding-top: 14px;
               border-top: 1px solid rgba(255,255,255,0.06);
            }

            /* ── Highlights ── */
            .intg-corp__highlights {
               display: flex;
               flex-wrap: wrap;
               gap: 20px 32px;
               justify-content: center;
               padding: 32px 0;
               border-top: 1px solid rgba(255,255,255,0.08);
               border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .intg-corp__hl-item {
               display: inline-flex;
               align-items: center;
               gap: 8px;
               font-size: 14px;
               font-weight: 500;
               color: rgba(255,255,255,0.5);
            }
            .intg-corp__hl-item i {
               font-size: 7px;
               color: var(--theme2, #F59E0B);
            }

            /* ── CTA ── */
            .intg-corp__cta {
               display: inline-flex;
               align-items: center;
               gap: 10px;
               padding: 14px 32px;
               font-size: 15px;
               font-weight: 600;
               color: #0f1b3d;
               background: var(--theme2, #F59E0B);
               border-radius: 8px;
               text-decoration: none;
               transition: all 0.3s ease;
            }
            .intg-corp__cta:hover {
               background: #fbbf24;
               transform: translateY(-2px);
               box-shadow: 0 8px 24px rgba(245,158,11,0.3);
               color: #0f1b3d;
            }
            .intg-corp__cta i {
               font-size: 12px;
               transition: transform 0.3s ease;
            }
            .intg-corp__cta:hover i {
               transform: translateX(4px);
            }

            /* ── Responsive ── */
            @media (max-width: 991px) {
               .intg-corp {
                  padding: 80px 0;
               }
            }
            @media (max-width: 575px) {
               .intg-corp {
                  padding: 60px 0;
               }
               .intg-corp__card {
                  padding: 24px 20px;
               }
               .intg-corp__card-num {
                  font-size: 28px;
                  margin-bottom: 14px;
               }
               .intg-corp__highlights {
                  gap: 14px 24px;
               }
               .intg-corp__hl-item {
                  font-size: 12px;
               }
            }
         `}</style>
      </section>
   );
};

export default Integration;
