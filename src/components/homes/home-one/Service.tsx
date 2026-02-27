import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DataType {
   id: number;
   thumb: string;
   icon: string;
   titleKey: string;
   descKey: string;
}

const service_data: DataType[] = [
   {
      id: 1,
      icon: "fa-solid fa-handshake",
      thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleKey: "services.items.0.title",
      descKey: "services.items.0.description"
   },
   {
      id: 2,
      icon: "fa-solid fa-calendar-days",
      thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleKey: "services.items.1.title",
      descKey: "services.items.1.description"
   },
   {
      id: 3,
      icon: "fa-solid fa-building-columns",
      thumb: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleKey: "services.items.2.title",
      descKey: "services.items.2.description"
   },
   {
      id: 4,
      icon: "fa-solid fa-chart-line",
      thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleKey: "services.items.3.title",
      descKey: "services.items.3.description"
   },
   {
      id: 5,
      icon: "fa-solid fa-plane",
      thumb: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleKey: "services.items.4.title",
      descKey: "services.items.4.description"
   },
   {
      id: 6,
      icon: "fa-solid fa-gears",
      thumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      titleKey: "services.items.5.title",
      descKey: "services.items.5.description"
   },
]

const Service = () => {
   const { t } = useTranslation();
   
   return (
      <section className="service-section section-bg pt-100 pb-100" style={{ marginTop: '-60px', borderRadius: '24px 24px 0 0', position: 'relative', zIndex: 2 }}>
         <div className="container">
            <div className="row g-sm-4 g-3 align-items-end mb-40">
               <div className="col-lg-6 col-md-7">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                        <img src="assets/img/icon/section-step1.png" alt="img" /> {t('services.title')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('services.subtitle')}
                     </h2>
                  </div>
               </div>
               <div className="col-lg-6 col-md-5">
                  <div className="text-md-end wow fadeInUp" data-wow-delay=".4s">
                     <Link to="/services" className="theme-btn style1 pe-20">
                        <i
                           className="fa-solid fa-arrow-right w-36 h-36 bg-white rounded-circle d-center fz-14 theme-clr4"></i>
                        {t('common.viewMore')}
                     </Link>
                  </div>
               </div>
            </div>
            <div className="row g-4">
               {service_data.slice(0, 3).map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div
                        className="team-items service-items1 hover-translate8 px-xxl-6 px-xxl-4 px-sm-3 px-3 section-bg rounded-4 h-100">
                        <div className="content d-flex align-items-start gap-3 justify-content-between">
                           <div>
                              <h5 className="mb-sm-2 mb-1 wow fadeInUp" data-wow-delay=".3s">
                                 <Link to="/services-details" className="theme-clr4 lh-110 fw-600">
                                    {t(item.titleKey)}
                                 </Link>
                              </h5>
                              <span className="fz-14 d-block theme-clr4 fw-500 mb-1">{t(item.descKey)}</span>
                           </div>
                           <Link to="/services-details"
                              className="theme-clr4 border hover-theme1 min-w-48 w-48 h-48 white-bg rounded-circle d-center d-xl-block d-none fs-five">
                              <i className="fa-solid fa-arrow-right"></i>
                           </Link>
                        </div>
                        <div className="thumb w-100 overflow-hidden position-relative">
                           <img src={item.thumb} className="w-100 rounded-bottom-3" alt={t(item.titleKey)} loading="lazy" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Service
