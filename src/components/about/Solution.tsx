import { useTranslation } from "react-i18next";

interface DataType {
   id: number;
   date: string;
   title: string;
   desc: string;
}

const Solution = () => {
   const { t } = useTranslation()

   const solution_data: DataType[] = [
      {
         id: 1,
         date: "2020",
         title: t('about.solution.timeline.2020.title'),
         desc: t('about.solution.timeline.2020.desc'),
      },
      {
         id: 2,
         date: "2021",
         title: t('about.solution.timeline.2021.title'),
         desc: t('about.solution.timeline.2021.desc'),
      },
      {
         id: 3,
         date: "2022",
         title: t('about.solution.timeline.2022.title'),
         desc: t('about.solution.timeline.2022.desc'),
      },
      {
         id: 4,
         date: "2023",
         title: t('about.solution.timeline.2023.title'),
         desc: t('about.solution.timeline.2023.desc'),
      },
      {
         id: 5,
         date: "2024",
         title: t('about.solution.timeline.2024.title'),
         desc: t('about.solution.timeline.2024.desc'),
      },
   ]

   return (
      <section className="step-solution section-bg pt-100 pb-100">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="section-header text-center mb-5">
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('about.solution.title')}
                        <span className="fw-300"> {t('about.solution.subtitle')}</span>
                     </h2>
                  </div>
               </div>
            </div>
            
            <div className="timeline-wrapper position-relative">
               {/* Central Timeline Line */}
               <div className="timeline-line position-absolute" style={{
                  left: '50%',
                  top: '0',
                  bottom: '0',
                  width: '2px',
                  background: '#023EDA',
                  transform: 'translateX(-50%)',
                  zIndex: 1
               }}></div>
               
               {solution_data.map((item, index) => (
                  <div key={item.id} className={`timeline-item row align-items-center mb-5 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                     {/* Content */}
                     <div className="col-lg-5">
                        <div className={`timeline-content p-4 rounded-4 ${index % 2 === 0 ? 'text-end' : 'text-start'}`} style={{
                           backgroundColor: '#f8f9fa',
                           border: '1px solid #e9ecef',
                           boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}>
                           <div className={`timeline-date fw-bold mb-2 ${index % 2 === 0 ? 'text-end' : 'text-start'}`} style={{
                              color: '#023EDA',
                              fontSize: '1.2rem',
                              fontWeight: '600'
                           }}>
                              {item.date}
                           </div>
                           <h4 className="timeline-title mb-3" style={{
                              color: '#333',
                              fontWeight: '600',
                              lineHeight: '1.3'
                           }}>
                              {item.title}
                           </h4>
                           <p className="timeline-desc mb-0" style={{
                              color: '#666',
                              lineHeight: '1.6'
                           }}>
                              {item.desc}
                           </p>
                        </div>
                     </div>
                     
                     {/* Center Dot */}
                     <div className="col-lg-2 text-center">
                        <div className="timeline-dot position-relative" style={{
                           width: '20px',
                           height: '20px',
                           backgroundColor: '#023EDA',
                           borderRadius: '50%',
                           margin: '0 auto',
                           zIndex: 2,
                           border: '4px solid white',
                           boxShadow: '0 0 0 2px #023EDA'
                        }}></div>
                     </div>
                     
                     {/* Spacer */}
                     <div className="col-lg-5"></div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Solution
