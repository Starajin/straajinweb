import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface StepData {
   title: string;
   intro: string;
   bullets: string[];
   closing: string;
}

const stepIcons = [
   "fa-solid fa-compass-drafting",
   "fa-solid fa-handshake",
   "fa-solid fa-globe",
   "fa-solid fa-chart-line",
];

const highlightIcons = [
   "fa-solid fa-layer-group",
   "fa-solid fa-people-group",
   "fa-solid fa-bullseye",
   "fa-solid fa-scale-balanced",
   "fa-solid fa-handshake-angle",
];

const Integration = () => {
   const { t } = useTranslation();

   const rawSteps = t('integration.steps', { returnObjects: true });
   const steps: StepData[] = Array.isArray(rawSteps) ? rawSteps : [];

   const rawHighlights = t('integration.highlights', { returnObjects: true });
   const highlights: string[] = Array.isArray(rawHighlights) ? rawHighlights : [];

   return (
      <section className="intg-h">
         <div className="container">

            {/* Header — left aligned */}
            <motion.div
               className="intg-h__header"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
               <span className="intg-h__eyebrow">{t('integration.eyebrow')}</span>
               <h2 className="intg-h__title">{t('integration.title')}</h2>
               <p className="intg-h__lead">
                  {t('integration.lead')}{' '}
                  <strong>{t('integration.leadBold')}</strong>
               </p>
            </motion.div>

            {/* Steps — horizontal 4-column grid with connecting line */}
            <div className="intg-h__steps-wrap">
               {/* Horizontal connector line */}
               <div className="intg-h__connector">
                  {steps.map((_, i) => (
                     <div key={i} className="intg-h__connector-dot" />
                  ))}
               </div>

               <div className="intg-h__steps">
                  {steps.map((step, i) => (
                     <motion.div
                        key={i}
                        className="intg-h__step"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                     >
                        <div className="intg-h__step-top">
                           <span className="intg-h__step-num">{String(i + 1).padStart(2, '0')}</span>
                           <h3 className="intg-h__step-title">{step.title}</h3>
                        </div>

                        {step.bullets?.length > 0 && (
                           <ul className="intg-h__step-list">
                              {step.bullets.map((b, j) => (
                                 <li key={j}>
                                    <i className={stepIcons[i]} />
                                    <span>{b}</span>
                                 </li>
                              ))}
                           </ul>
                        )}
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* Highlights — grid below steps */}
            <motion.div
               className="intg-h__highlights"
               initial={{ opacity: 0, y: 16 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.15 }}
            >
               {highlights.map((h, i) => {
                  const parts = h.split(' – ');
                  return (
                     <div key={i} className="intg-h__hl-item">
                        <i className={highlightIcons[i] || 'fa-solid fa-check-circle'} />
                        <span>
                           <strong>{parts[0]}</strong>
                           {parts[1] && <>{' – '}{parts[1]}</>}
                        </span>
                     </div>
                  );
               })}
            </motion.div>

            {/* CTA — centered */}
            <motion.div
               className="intg-h__cta-wrap"
               initial={{ opacity: 0, y: 16 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4, delay: 0.2 }}
            >
               <p className="intg-h__cta-text">{t('integration.cta')}</p>
               <Link to="/services" className="intg-h__cta-btn">
                  Explore Our Process
                  <i className="fa-solid fa-arrow-right" />
               </Link>
            </motion.div>
         </div>

         <style>{`
            .intg-h {
               padding: 100px 0 80px;
               background: linear-gradient(170deg, #0f1b3d 0%, #162550 40%, #1a2d5e 100%);
               position: relative;
               overflow: hidden;
            }
            .intg-h::before {
               content: '';
               position: absolute;
               inset: 0;
               background: radial-gradient(ellipse at 20% 0%, rgba(30,58,138,0.3) 0%, transparent 60%),
                           radial-gradient(ellipse at 80% 100%, rgba(245,158,11,0.06) 0%, transparent 50%);
               pointer-events: none;
            }

            /* ── Header ── */
            .intg-h__header {
               text-align: left;
               max-width: 700px;
               margin: 0 0 50px;
            }
            .intg-h__eyebrow {
               display: inline-block;
               font-size: 12px;
               font-weight: 700;
               letter-spacing: 0.12em;
               text-transform: uppercase;
               color: var(--theme2, #F59E0B);
               background: rgba(245,158,11,0.1);
               border: 1px solid rgba(245,158,11,0.2);
               padding: 6px 16px;
               border-radius: 20px;
               margin-bottom: 20px;
            }
            .intg-h__title {
               font-size: clamp(1.6rem, 3vw, 2.2rem) !important;
               font-weight: 700;
               line-height: 1.3;
               color: #ffffff;
               margin-bottom: 16px;
               word-break: keep-all;
            }
            .intg-h__lead {
               font-size: 15px;
               line-height: 1.7;
               color: rgba(255,255,255,0.55);
               margin: 0;
            }
            .intg-h__lead strong {
               color: rgba(255,255,255,0.85);
               font-weight: 600;
            }

            /* ── Steps — horizontal 4-col ── */
            .intg-h__steps-wrap {
               position: relative;
               margin-bottom: 48px;
            }

            /* Horizontal connector line with dots */
            .intg-h__connector {
               position: absolute;
               top: 18px;
               left: 0;
               right: 0;
               height: 2px;
               background: linear-gradient(90deg, var(--theme2, #F59E0B), rgba(245,158,11,0.3));
               display: flex;
               justify-content: space-between;
               align-items: center;
               z-index: 1;
            }
            .intg-h__connector-dot {
               width: 10px;
               height: 10px;
               border-radius: 50%;
               background: var(--theme2, #F59E0B);
               border: 2px solid #162550;
               flex-shrink: 0;
            }

            .intg-h__steps {
               display: grid;
               grid-template-columns: repeat(4, 1fr);
               gap: 0;
               position: relative;
               z-index: 2;
            }
            .intg-h__step {
               padding: 40px 20px 0 0;
            }
            .intg-h__step:not(:last-child) {
               border-right: 1px solid rgba(255,255,255,0.06);
               padding-right: 20px;
            }
            .intg-h__step:not(:first-child) {
               padding-left: 20px;
            }

            .intg-h__step-top {
               margin-bottom: 16px;
            }
            .intg-h__step-num {
               display: block;
               font-size: 28px;
               font-weight: 800;
               color: var(--theme2, #F59E0B);
               opacity: 0.35;
               line-height: 1;
               margin-bottom: 8px;
            }
            .intg-h__step-title {
               font-size: 16px !important;
               font-weight: 700;
               color: #ffffff;
               line-height: 1.35;
               margin: 0;
               word-break: keep-all;
            }

            .intg-h__step-list {
               list-style: none;
               padding: 0;
               margin: 0;
               display: flex;
               flex-direction: column;
               gap: 8px;
            }
            .intg-h__step-list li {
               display: flex;
               align-items: flex-start;
               gap: 8px;
               font-size: 13px;
               color: rgba(255,255,255,0.6);
               line-height: 1.5;
            }
            .intg-h__step-list li i {
               font-size: 11px;
               color: var(--theme2, #F59E0B);
               margin-top: 3px;
               flex-shrink: 0;
               opacity: 0.7;
            }

            /* ── Highlights — multi-column grid ── */
            .intg-h__highlights {
               display: grid;
               grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
               gap: 10px 24px;
               padding: 24px 0;
               border-top: 1px solid rgba(255,255,255,0.08);
               border-bottom: 1px solid rgba(255,255,255,0.08);
               margin-bottom: 40px;
            }
            .intg-h__hl-item {
               display: flex;
               align-items: flex-start;
               gap: 8px;
               font-size: 13px;
               color: rgba(255,255,255,0.55);
               line-height: 1.45;
            }
            .intg-h__hl-item i {
               font-size: 13px;
               color: var(--theme2, #F59E0B);
               margin-top: 2px;
               flex-shrink: 0;
            }
            .intg-h__hl-item strong {
               color: rgba(255,255,255,0.8);
               font-weight: 600;
            }

            /* ── CTA — centered ── */
            .intg-h__cta-wrap {
               text-align: center;
            }
            .intg-h__cta-text {
               font-size: 15px;
               font-weight: 600;
               color: rgba(255,255,255,0.7);
               margin-bottom: 16px;
            }
            .intg-h__cta-btn {
               display: inline-flex;
               align-items: center;
               gap: 10px;
               padding: 13px 32px;
               font-size: 14px;
               font-weight: 600;
               color: #0f1b3d;
               background: var(--theme2, #F59E0B);
               border: 2px solid var(--theme2, #F59E0B);
               border-radius: 6px;
               text-decoration: none;
               transition: all 0.3s ease;
            }
            .intg-h__cta-btn:hover {
               background: transparent;
               color: var(--theme2, #F59E0B);
               transform: translateY(-2px);
               box-shadow: 0 6px 20px rgba(245,158,11,0.2);
            }
            .intg-h__cta-btn i {
               font-size: 12px;
               transition: transform 0.3s ease;
            }
            .intg-h__cta-btn:hover i {
               transform: translateX(4px);
            }

            /* ── Responsive ── */
            @media (max-width: 991px) {
               .intg-h { padding: 80px 0 60px; }
               .intg-h__steps {
                  grid-template-columns: repeat(2, 1fr);
                  gap: 28px 0;
               }
               .intg-h__connector { display: none; }
               .intg-h__step { padding-top: 0; }
               .intg-h__step:nth-child(odd) {
                  border-right: 1px solid rgba(255,255,255,0.06);
                  padding-right: 20px;
               }
               .intg-h__step:nth-child(even) {
                  border-right: none;
                  padding-left: 20px;
                  padding-right: 0;
               }
               .intg-h__highlights {
                  grid-template-columns: repeat(2, 1fr);
               }
            }
            @media (max-width: 575px) {
               .intg-h { padding: 60px 0 40px; }
               .intg-h__steps {
                  grid-template-columns: 1fr;
                  gap: 24px;
               }
               .intg-h__step {
                  border-right: none !important;
                  padding: 0 !important;
                  padding-bottom: 24px !important;
                  border-bottom: 1px solid rgba(255,255,255,0.06);
               }
               .intg-h__step:last-child {
                  border-bottom: none;
                  padding-bottom: 0 !important;
               }
               .intg-h__highlights {
                  grid-template-columns: 1fr;
                  gap: 8px;
               }
               .intg-h__cta-btn { width: 100%; justify-content: center; }
            }
         `}</style>
      </section>
   );
};

export default Integration;
