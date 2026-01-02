import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const industry_list: { titleKey: string; descriptionKey: string; icon: string }[] = [
   {
      titleKey: "industries.items.0.title",
      descriptionKey: "industries.items.0.description",
      icon: "fa-solid fa-building"
   },
   {
      titleKey: "industries.items.1.title", 
      descriptionKey: "industries.items.1.description",
      icon: "fa-solid fa-location-dot"
   },
   {
      titleKey: "industries.items.2.title",
      descriptionKey: "industries.items.2.description",
      icon: "fa-solid fa-clipboard-check"
   },
   {
      titleKey: "industries.items.3.title",
      descriptionKey: "industries.items.3.description",
      icon: "fa-solid fa-chart-line"
   }
];

const Industries = () => {
   const { t } = useTranslation();
   return (
      <section className="industries-section section-bg pt-100 pb-100">
         <div className="container">
            <div className="row align-items-end mb-40">
               <div className="col-lg-8">
                  <motion.div
                     initial={{ opacity: 0, y: 18 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.55 }}
                     className="section-header"
                  >
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('industries.subtitle')}
                     </div>
                     <h2 className="theme-clr4 fw-bold mb-2">
                        {t('industries.title')}
                     </h2>
                     <p className="mb-0 industries-description">
                        {t('industries.description')}
                     </p>
                  </motion.div>
               </div>
            </div>

            <div className="row g-4">
               {industry_list.map((item, i) => (
                  <div key={i} className="col-lg-6">
                     <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: i * 0.08 }}
                        className="industry-card h-100"
                     >
                        <div className="industry-icon" aria-hidden="true">
                           <i className={item.icon}></i>
                        </div>
                        <div className="industry-body">
                           <h4 className="theme-clr4 fw-bold mb-2">
                              {t(item.titleKey)}
                           </h4>
                           <p className="mb-0">
                              {t(item.descriptionKey)}
                           </p>
                        </div>
                     </motion.div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Industries
