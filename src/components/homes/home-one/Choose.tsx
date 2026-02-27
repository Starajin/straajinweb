import { useTranslation } from "react-i18next";
import { useState } from "react";

interface DataType {
   id: number;
   titleKey: string;
   descKey: string;
   icon: string;
}

const choose_data: DataType[] = [
   {
      id: 1,
      titleKey: "choose.items.0.title",
      descKey: "choose.items.0.description",
      icon: "fa-solid fa-award"
   },
   {
      id: 2,
      titleKey: "choose.items.1.title",
      descKey: "choose.items.1.description",
      icon: "fa-solid fa-network-wired"
   },
   {
      id: 3,
      titleKey: "choose.items.2.title",
      descKey: "choose.items.2.description",
      icon: "fa-solid fa-trophy"
   },
   {
      id: 4,
      titleKey: "choose.items.3.title",
      descKey: "choose.items.3.description",
      icon: "fa-solid fa-handshake"
   },
];

const Choose = () => {
   const { t } = useTranslation();
   const [selectedItem, setSelectedItem] = useState<number>(1); // Default to first item

   return (
      <section className="choose-section z-1 position-relative section-bg pt-100 pb-100">
         <div className="container">
            <div className="row g-4">
               <div className="col-lg-6 pt-lg-5 mt-5 order-2 order-lg-1">
                  <div className="choose-content-wrap d-flex flex-column gap-xxl-4 gap-lg-3 gap-2">
                     {choose_data.map((item) => (
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
                     ))}
                  </div>
               </div>
               <div className="col-lg-6 order-1 order-lg-2">
                  <div className="choose-thumb-wrap">
                     <div className="boxes">
                        <div className="section-header mb-4">
                           <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                              <img src="assets/img/icon/section-step1.png" alt="img" /> {t('choose.title')}
                           </div>
                           <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".4s">
                              {t('choose.subtitle')}
                           </h2>
                        </div>
                        <div className="thumb rounded-3 position-relative w-100 " >
                           <img src="assets/img/service/choose-section.png" alt="img" className="w-100 rounded-3" loading="lazy" />
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
