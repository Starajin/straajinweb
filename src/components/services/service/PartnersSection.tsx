import { useTranslation } from "react-i18next";

interface Partner {
   name: string;
   abbr: string;
}

const PartnersSection = () => {
   const { t } = useTranslation();

   const rawKorea = t('services.partners.koreaPartners', { returnObjects: true });
   const rawIndia = t('services.partners.indiaPartners', { returnObjects: true });
   const koreaPartners: Partner[] = Array.isArray(rawKorea) ? rawKorea : [];
   const indiaPartners: Partner[] = Array.isArray(rawIndia) ? rawIndia : [];

   return (
      <section className="partners-list-section pt-100 pb-100">
         <div className="container">
            {/* Header: Title left, Description right */}
            <div className="row mb-60 align-items-start">
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

            {/* Two columns: KR and IN */}
            <div className="row g-5">
               {/* Korea-side */}
               <div className="col-lg-6">
                  <div className="partners-column">
                     <div className="partners-column-header wow fadeInUp" data-wow-delay=".2s">
                        <span className="partners-country-tag">KR</span>
                        <span className="partners-column-title">{t('services.partners.koreaSide')}</span>
                     </div>
                     <div className="partners-column-list">
                        {koreaPartners.map((p, idx) => (
                           <div key={idx} className="partners-row wow fadeInUp" data-wow-delay={`${0.1 * (idx + 1)}s`}>
                              <span className="partners-name">{p.name}</span>
                              <span className="partners-badge">{p.abbr}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* India-side */}
               <div className="col-lg-6">
                  <div className="partners-column">
                     <div className="partners-column-header wow fadeInUp" data-wow-delay=".2s">
                        <span className="partners-country-tag partners-country-tag--in">IN</span>
                        <span className="partners-column-title">{t('services.partners.indiaSide')}</span>
                     </div>
                     <div className="partners-column-list">
                        {indiaPartners.map((p, idx) => (
                           <div key={idx} className="partners-row wow fadeInUp" data-wow-delay={`${0.1 * (idx + 1)}s`}>
                              <span className="partners-name">{p.name}</span>
                              <span className="partners-badge">{p.abbr}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default PartnersSection;
