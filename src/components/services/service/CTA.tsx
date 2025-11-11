import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CTA = () => {
   const { t } = useTranslation();
   
   return (
      <section className="section-bg pt-100 pb-100">
         <div className="container">
            <div className="text-center">
               <div className="section-header">
                  <h2 className="theme-clr4 mb-40 fw-bold wow fadeInUp" data-wow-delay=".3s">
                     {t('cta.title')}
                  </h2>
                  <p className="theme-clr4 opacity-75 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                     {t('cta.description')}
                  </p>
                  <div className="d-flex justify-content-center">
                     <Link to="/contact" className="theme-btn style1 pe-20">
                        <i className="fa-solid fa-arrow-right w-36 h-36 bg-white rounded-circle d-center fz-14 theme-clr4"></i>
                        {t('cta.buttonText')}
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Contact Stats */}
         <div className="pt-5 mt-5" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div className="container py-4">
               <div className="row g-4 justify-content-center align-items-center">
                  <div className="col-lg-4">
                     <div className="text-lg-start text-center">
                        <div className="d-flex align-items-center justify-content-lg-start justify-content-center gap-3 mb-3">
                           <div className="w-48 h-48 rounded-circle d-center cta-icon-circle">
                              <i className="fa-solid fa-phone text-white"></i>
                           </div>
                           <div className="text-start">
                              <h6 className="theme-clr4 mb-1">{t('cta.contactInfo.phone.title')}</h6>
                              <p className="theme-clr4 opacity-75 mb-0 small">{t('cta.contactInfo.phone.number')}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                           <div className="w-48 h-48 rounded-circle d-center cta-icon-circle">
                              <i className="fa-solid fa-envelope text-white"></i>
                           </div>
                           <div className="text-start">
                              <h6 className="theme-clr4 mb-1">{t('cta.contactInfo.email.title')}</h6>
                              <p className="theme-clr4 opacity-75 mb-0 small">{t('cta.contactInfo.email.address')}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="text-lg-end text-center">
                        <div className="d-flex align-items-center justify-content-lg-end justify-content-center gap-3 mb-3">
                           <div className="w-48 h-48 rounded-circle d-center cta-icon-circle">
                              <i className="fa-solid fa-map-marker-alt text-white"></i>
                           </div>
                           <div className="text-start">
                              <h6 className="theme-clr4 mb-1">{t('cta.contactInfo.location.title')}</h6>
                              <p className="theme-clr4 opacity-75 mb-0 small">{t('cta.contactInfo.location.address')}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default CTA