import { useTranslation } from "react-i18next";
import { useState } from "react";
import { api } from "../../../services/api";
import { useCmsData } from "../../../hooks/useCmsData";
import { useLang } from "../../../hooks/useLang";

const fallback_items = [
   { id: 1, titleKey: "choose.items.0.title", descKey: "choose.items.0.description", icon: "fa-solid fa-award" },
   { id: 2, titleKey: "choose.items.1.title", descKey: "choose.items.1.description", icon: "fa-solid fa-network-wired" },
   { id: 3, titleKey: "choose.items.2.title", descKey: "choose.items.2.description", icon: "fa-solid fa-trophy" },
   { id: 4, titleKey: "choose.items.3.title", descKey: "choose.items.3.description", icon: "fa-solid fa-handshake" },
];

const Choose = () => {
   const { t } = useTranslation();
   const { pick } = useLang();
   const [selectedItem, setSelectedItem] = useState<number>(1);

   const { data: sections } = useCmsData(() => api.getPageContent('home'), [] as any[]);
   const chooseSection = sections.find((s: any) => s.section === 'choose');

   const sectionTitle = chooseSection ? pick(chooseSection, 'title') : t('choose.title');
   const sectionSubtitle = chooseSection ? pick(chooseSection, 'subtitle') : t('choose.subtitle');
   const sectionImage = chooseSection?.imageUrl || '/assets/img/about/Choose one - 4.png';
   const cards = chooseSection?.metadata?.cards;
   const useCms = Array.isArray(cards) && cards.length > 0;

   return (
      <section className="choose-section z-1 position-relative section-bg pt-100 pb-100">
         <div className="container">
            <div className="row g-4">
               <div className="col-lg-6 pt-lg-5 mt-5 order-2 order-lg-1">
                  <div className="choose-content-wrap d-flex flex-column gap-xxl-4 gap-lg-3 gap-2">
                     {useCms
                        ? cards.map((card: any, idx: number) => (
                           <div key={idx}
                              className={`choose-items border rounded-3 d-flex align-items-center gap-xxl-4 gap-md-3 gap-2 wow fadeInUp ${selectedItem === idx + 1 ? 'selected' : ''}`}
                              data-wow-delay=".2s"
                              onClick={() => setSelectedItem(idx + 1)}
                              style={{ cursor: 'pointer' }}>
                              <div className={`choose-icon-wrapper ${selectedItem === idx + 1 ? 'selected' : ''}`}>
                                 <i className={`fa-solid ${card.icon}`}></i>
                              </div>
                              <div>
                                 <h4 className="theme-clr4 mb-2">{pick(card, 'title')}</h4>
                                 <p className="theme-clr4">{pick(card, 'desc')}</p>
                              </div>
                           </div>
                        ))
                        : fallback_items.map((item) => (
                           <div key={item.id}
                              className={`choose-items border rounded-3 d-flex align-items-center gap-xxl-4 gap-md-3 gap-2 wow fadeInUp ${selectedItem === item.id ? 'selected' : ''}`}
                              data-wow-delay=".2s"
                              onClick={() => setSelectedItem(item.id)}
                              style={{ cursor: 'pointer' }}>
                              <div className={`choose-icon-wrapper ${selectedItem === item.id ? 'selected' : ''}`}>
                                 <i className={item.icon}></i>
                              </div>
                              <div>
                                 <h4 className="theme-clr4 mb-2">{t(item.titleKey)}</h4>
                                 <p className="theme-clr4">{t(item.descKey)}</p>
                              </div>
                           </div>
                        ))
                     }
                  </div>
               </div>
               <div className="col-lg-6 order-1 order-lg-2">
                  <div className="choose-thumb-wrap">
                     <div className="boxes">
                        <div className="section-header mb-4">
                           <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                              <img src="assets/img/icon/section-step1.png" alt="img" /> {sectionTitle}
                           </div>
                           <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".4s">
                              {sectionSubtitle}
                           </h2>
                        </div>
                        <div className="thumb rounded-3 position-relative w-100 " >
                           <img src={sectionImage} alt="img" className="w-100 rounded-3" loading="lazy" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section >
   )
}

export default Choose
