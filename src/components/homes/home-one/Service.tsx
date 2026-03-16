import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../../../services/api";
import { useCmsData } from "../../../hooks/useCmsData";
import { useLang } from "../../../hooks/useLang";

interface DataType {
   id: number;
   thumb: string;
   title: string;
   desc: string;
}

const fallback_images = [
   "/assets/img/service/India Market Entry Consulting.png",
   "/assets/img/service/Research & Strategic Advisory.png",
   "/assets/img/service/Execution & Corporate Academy.png",
];

const fallback_data: DataType[] = [
   { id: 1, thumb: fallback_images[0], title: "services.items.0.title", desc: "services.items.0.description" },
   { id: 2, thumb: fallback_images[1], title: "services.items.1.title", desc: "services.items.1.description" },
   { id: 3, thumb: fallback_images[2], title: "services.items.2.title", desc: "services.items.2.description" },
];

const Service = () => {
   const { t } = useTranslation();
   const { pick } = useLang();

   const { data: cmsServices } = useCmsData(() => api.getServices(), [] as any[]);
   const { data: sections } = useCmsData(() => api.getPageContent('home'), [] as any[]);
   const svcSection = sections.find((s: any) => s.section === 'services');

   const service_data: DataType[] = cmsServices.length > 0
      ? cmsServices.slice(0, 3).map((s: any, i: number) => ({
         id: s.id,
         thumb: s.imageUrl || s.iconUrl || fallback_images[i] || '/assets/img/service/placeholder.png',
         title: pick(s, 'name') || pick(s, 'title'),
         desc: pick(s, 'shortDescription') || pick(s, 'description'),
      }))
      : fallback_data;

   const useCms = cmsServices.length > 0;

   return (
      <section className="service-section section-bg pt-100 pb-100 service-overlap">
         <div className="container">
            <div className="row g-sm-4 g-3 align-items-end mb-40">
               <div className="col-lg-6 col-md-7">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                        <img src="assets/img/icon/section-step1.png" alt="img" /> {svcSection ? pick(svcSection, 'subtitle') : t('services.title')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {svcSection ? pick(svcSection, 'title') : t('services.subtitle')}
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
               {service_data.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div
                        className="team-items service-items1 hover-translate8 px-xxl-6 px-xl-4 px-sm-3 px-3 section-bg rounded-4 h-100 d-flex flex-column">
                        <div className="content d-flex align-items-start gap-3 justify-content-between">
                           <div>
                              <h5 className="mb-sm-2 mb-1 wow fadeInUp theme-clr4 lh-110 fw-600" data-wow-delay=".3s">
                                 {useCms ? item.title : t(item.title)}
                              </h5>
                              <span className="fz-14 d-block theme-clr4 fw-500 mb-1">{useCms ? item.desc : t(item.desc)}</span>
                           </div>
                        </div>
                        <div className="thumb w-100 overflow-hidden mt-auto">
                           <img src={item.thumb} className="w-100 rounded-3" alt={useCms ? item.title : t(item.title)} loading="lazy" style={{height: '220px', objectFit: 'cover', objectPosition: 'center', display: 'block'}} />
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
