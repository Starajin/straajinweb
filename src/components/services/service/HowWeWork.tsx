import { useTranslation } from "react-i18next";

const HowWeWork = () => {
   const { t } = useTranslation();

   const workProcessData = [
      {
         id: 1,
         step: t('howWeWork.items.0.step'),
         title: t('howWeWork.items.0.title'),
         description: t('howWeWork.items.0.description'),
         icon: "/assets/img/icon/choose-icon1.png",
         color: "primary"
      },
      {
         id: 2,
         step: t('howWeWork.items.1.step'), 
         title: t('howWeWork.items.1.title'),
         description: t('howWeWork.items.1.description'),
         icon: "/assets/img/icon/choose-icon2.png",
         color: "success"
      },
      {
         id: 3,
         step: t('howWeWork.items.2.step'),
         title: t('howWeWork.items.2.title'),
         description: t('howWeWork.items.2.description'),
         icon: "/assets/img/icon/choose-icon3.png",
         color: "info"
      },
      {
         id: 4,
         step: t('howWeWork.items.3.step'),
         title: t('howWeWork.items.3.title'),
         description: t('howWeWork.items.3.description'),
         icon: "/assets/img/icon/choose-icon4.png",
         color: "warning"
      }
   ];

   return (
      <section className="how-we-work-section pt-100 pb-100 bg-light">
         <div className="container">
            {/* Section Header */}
            <div className="row mb-5 pb-4">
               <div className="col-12">
                  <div className="section-header text-start">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-3">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('howWeWork.title')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp mb-5" data-wow-delay=".3s">
                        {t('howWeWork.subtitle')} <span className="theme-clr">Process</span> <br />
                        <span className="fw-300">{t('howWeWork.description')}</span>
                     </h2>
                  </div>
               </div>
            </div>

            {/* Process Steps */}
            <div className="row g-4">
               {workProcessData.map((item, index) => (
                  <div key={item.id} className="col-lg-6 col-md-6">
                     <div className={`how-we-work-card h-100 p-4 bg-white rounded-4 shadow-sm position-relative wow fadeInUp`} data-wow-delay={`${0.3 + (index * 0.2)}s`}>
                        {/* Step Number */}
                        <div className="step-number position-absolute top-0 start-0 mt-3 ms-3">
                           <span className={`badge bg-${item.color} text-white fw-bold px-3 py-2 rounded-pill`}>
                              {item.step}
                           </span>
                        </div>
                        
                        {/* Card Content */}
                        <div className="card-content pt-4">
                           <div className="d-flex align-items-start gap-3">
                              {/* Icon */}
                              <div className="process-icon flex-shrink-0">
                                 <div className={`icon-wrapper bg-${item.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`} style={{width: '60px', height: '60px'}}>
                                    <img src={item.icon} alt="icon" style={{width: '30px', height: '30px'}} />
                                 </div>
                              </div>
                              
                              {/* Content */}
                              <div className="process-content flex-grow-1">
                                 <h4 className="theme-clr4 fw-600 mb-3 lh-base">
                                    {item.title}
                                 </h4>
                                 <p className="theme-clr4 mb-0 lh-relaxed">
                                    {item.description}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Connecting Line (except for last item) */}
                        {index < workProcessData.length - 1 && (
                           <div className="process-connector d-none d-lg-block">
                              <div className={`connector-line bg-${item.color} opacity-25`} style={{
                                 position: 'absolute',
                                 right: '-2rem',
                                 top: '50%',
                                 width: '4rem',
                                 height: '2px',
                                 transform: 'translateY(-50%)'
                              }}></div>
                              <div className={`connector-arrow bg-${item.color}`} style={{
                                 position: 'absolute',
                                 right: '-0.5rem',
                                 top: '50%',
                                 width: '10px',
                                 height: '10px',
                                 transform: 'translateY(-50%) rotate(45deg)'
                              }}></div>
                           </div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default HowWeWork;