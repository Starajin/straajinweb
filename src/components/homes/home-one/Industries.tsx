import { useTranslation } from "react-i18next";

const industry_list: {titleKey: string, descriptionKey: string, icon: string}[] = [
   {
      titleKey: "industries.items.0.title",
      descriptionKey: "industries.items.0.description",
      icon: "fa-solid fa-building"
   },
   {
      titleKey: "industries.items.1.title", 
      descriptionKey: "industries.items.1.description",
      icon: "fa-solid fa-search-location"
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
            <div className="row mb-5">
               <div className="col-12">
                  <h2 className="section-title fw-bold">{t('industries.title')}</h2>
               </div>
            </div>
            <div className="row g-4 justify-content-between">
               <div className="col-xl-6 col-lg-6">
                  <div className="graph-image-container position-relative">
                     <img src="assets/img/element/Graph.png" alt="img" className="w-100" />
                  </div>
               </div>
               <div className="col-xl-5 col-lg-6">
                  <div className="industries-content h-100">
                     <img src="assets/img/element/industry-links.png" alt="img" className="industries-shape" />
                     <div className="boxex h-100 d-flex flex-column justify-content-center">
                        <ul>
                           {industry_list.map((item, i) => (
                              <li key={i} className="d-flex py-2 align-items-start fw-600 theme-clr4 justify-content-between gap-2 flex-sm-nowrap flex-wrap py-1 wow fadeInUp"
                                 data-wow-delay=".2s">
                                 <div className="w-100">
                                    <div className="industry-title fw-bold fs-5 mb-2">{t(item.titleKey)}</div>
                                    <p className="industry-description mb-0 mt-1 text-muted fw-light">{t(item.descriptionKey)}</p>
                                 </div>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Industries
