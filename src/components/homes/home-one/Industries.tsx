import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const industry_list: {titleKey: string, descriptionKey: string, icon: string, gradient: string}[] = [
   {
      titleKey: "industries.items.0.title",
      descriptionKey: "industries.items.0.description",
      icon: "fa-solid fa-building",
      gradient: "linear-gradient(135deg, var(--theme) 0%, var(--theme2) 100%)"
   },
   {
      titleKey: "industries.items.1.title", 
      descriptionKey: "industries.items.1.description",
      icon: "fa-solid fa-search-location",
      gradient: "linear-gradient(135deg, var(--theme2) 0%, var(--theme) 100%)"
   },
   {
      titleKey: "industries.items.2.title",
      descriptionKey: "industries.items.2.description",
      icon: "fa-solid fa-clipboard-check",
      gradient: "linear-gradient(135deg, var(--theme) 0%, var(--theme2) 100%)"
   },
   {
      titleKey: "industries.items.3.title",
      descriptionKey: "industries.items.3.description",
      icon: "fa-solid fa-chart-line",
      gradient: "linear-gradient(135deg, var(--theme2) 0%, var(--theme) 100%)"
   }
];

const Industries = () => {
   const { t } = useTranslation();
   return (
      <section className="industries-section pt-100 pb-100" style={{ 
         background: 'var(--theme)',
         position: 'relative'
      }}>
         {/* Overlay for better readability */}
         <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.05)',
            pointerEvents: 'none'
         }} />
         
         <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Section Header */}
            <div className="row mb-5">
               <div className="col-12">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                  >
                     <h2 className="fw-bold mb-3" style={{ color: '#ffffff !important', fontSize: '2.5rem' }}>{t('industries.title')}</h2>
                     <p className="fs-5" style={{ lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px' }}>
                        {t('industries.description')}
                     </p>
                  </motion.div>
               </div>
            </div>

            {/* Services Grid */}
            <div className="row g-4">
               {industry_list.map((item, i) => (
                  <div key={i} className="col-lg-6 col-md-6">
                     <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        style={{
                           height: '100%',
                           background: '#ffffff',
                           borderRadius: '16px',
                           padding: '40px 30px',
                           boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                           border: '1px solid rgba(255,255,255,0.2)',
                           position: 'relative',
                           overflow: 'hidden',
                           transition: 'all 0.3s ease'
                        }}
                        whileHover={{ 
                           y: -8,
                           boxShadow: '0 16px 50px rgba(0,0,0,0.25)'
                        }}
                     >
                        {/* Background Decoration */}
                        <div style={{
                           position: 'absolute',
                           top: '-50px',
                           right: '-50px',
                           width: '150px',
                           height: '150px',
                           background: item.gradient,
                           opacity: 0.05,
                           borderRadius: '50%'
                        }} />

                        {/* Icon Circle */}
                        <div className="mb-4" style={{
                           width: '70px',
                           height: '70px',
                           borderRadius: '50%',
                           background: item.gradient,
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           position: 'relative',
                           zIndex: 1
                        }}>
                           <i className={item.icon} style={{
                              fontSize: '30px',
                              color: '#ffffff'
                           }} />
                        </div>

                        {/* Content */}
                        <h4 className="fw-bold mb-3" style={{
                           fontSize: '1.25rem',
                           color: '#1a1a1a',
                           lineHeight: '1.4'
                        }}>
                           {t(item.titleKey)}
                        </h4>
                        
                        <p className="mb-0" style={{
                           color: '#6b7280',
                           fontSize: '0.95rem',
                           lineHeight: '1.7'
                        }}>
                           {t(item.descriptionKey)}
                        </p>

                        {/* Bottom Accent Line */}
                        <div style={{
                           position: 'absolute',
                           bottom: 0,
                           left: 0,
                           right: 0,
                           height: '4px',
                           background: item.gradient
                        }} />
                     </motion.div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Industries
