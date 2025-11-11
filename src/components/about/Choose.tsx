import { JSX } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DataType {
   id: number;
   icon: string;
   title: JSX.Element;
   desc: string;
}

const Choose = () => {
   const { t } = useTranslation()

   const choose_data: DataType[] = [
      {
         id: 1,
         icon: "fa-solid fa-calendar-check",
         title: (<>{t('about.choose.achievements.experience').split(' ')[0]} <br /> {t('about.choose.achievements.experience').split(' ').slice(1).join(' ')}</>),
         desc: t('about.choose.achievements.experienceDesc'),
      },
      {
         id: 2,
         icon: "fa-solid fa-network-wired",
         title: (<>{t('about.choose.achievements.network').split(' ')[0]} <br /> {t('about.choose.achievements.network').split(' ').slice(1).join(' ')}</>),
         desc: t('about.choose.achievements.networkDesc'),
      },
      {
         id: 3,
         icon: "fa-solid fa-briefcase",
         title: (<>{t('about.choose.achievements.cases').split(' ')[0]} <br /> {t('about.choose.achievements.cases').split(' ').slice(1).join(' ')}</>),
         desc: t('about.choose.achievements.casesDesc'),
      },
      {
         id: 4,
         icon: "fa-solid fa-headset",
         title: (<>{t('about.choose.achievements.support').split(' ')[0]} <br /> {t('about.choose.achievements.support').split(' ').slice(1).join(' ')}</>),
         desc: t('about.choose.achievements.supportDesc'),
      },
   ]

   return (
      <section className="choose4-section pt-100 pb-100">
         <div className="container">
            <div className="row g-lg-4 g-md-3 g-2 align-items-end mb-40">
               <div className="col-lg-7 col-md-7">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-lg-3 m-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('about.choose.tag')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('about.choose.title')}
                        <span className="fw-300"> {t('about.choose.subtitle')}</span>
                     </h2>
                  </div>
               </div>
               <div className="col-lg-5 col-md-5">
                  <div className="wow fadeInUp" data-wow-delay=".4s">
                     <p className="theme-clr4">
                        {t('about.choose.description')}
                     </p>
                  </div>
               </div>
            </div>
            <div className="row g-xxl-4 g-xl-3 g-2">
               {choose_data.map((item) => (
                  <div key={item.id} className="col-sm-6 col-lg-3">
                     <div className="choose-items4 wow fadeInDown" data-wow-delay=".2s">
                        <div className="boxes">
                           <div className="choose-icon-circle mb-lg-5 mb-4">
                              <i className={item.icon}></i>
                           </div>
                           <h5 className="border-bottom pb-3 mb-4">
                              <Link to="/about" className="text-uppercase fw-600 theme-clr4">
                                 {item.title}
                              </Link>
                           </h5>
                           <p className="theme-clr4">{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Choose
