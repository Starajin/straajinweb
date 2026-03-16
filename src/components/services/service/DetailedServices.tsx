import { useTranslation } from "react-i18next";
import { getTranslatedArray } from "../../../utils/i18n";
import { api } from "../../../services/api";
import { useCmsData } from "../../../hooks/useCmsData";
import { useLang } from "../../../hooks/useLang";

const DetailedServices = () => {
   const { t } = useTranslation();
   const { lang, pick } = useLang();

   const { data: cmsSections } = useCmsData(() => api.getPageContent('services'), [] as any[]);
   const consultingSection = cmsSections.find((s: any) => s.section === 'consulting');
   const researchSection = cmsSections.find((s: any) => s.section === 'research');
   const executionSection = cmsSections.find((s: any) => s.section === 'execution');

   const consultingMeta = consultingSection?.metadata || {};

   // Hardcoded fallback sections
   const fallbackSections = [
      {
         num: "01",
         titleKey: "services.detailed.consulting.title",
         subtitleKey: "services.detailed.consulting.subtitle",
         cards: [
            { icon: "fa-building", titleKey: "services.detailed.consulting.sole.title", descKey: "services.detailed.consulting.sole.desc", itemsKey: "services.detailed.consulting.sole.items" },
            { icon: "fa-handshake", titleKey: "services.detailed.consulting.jv.title", descKey: "services.detailed.consulting.jv.desc", itemsKey: "services.detailed.consulting.jv.items" },
         ]
      },
      {
         num: "02",
         titleKey: "services.detailed.research.title",
         subtitleKey: "services.detailed.research.subtitle",
         cards: [
            { icon: "fa-magnifying-glass-chart", titleKey: "services.detailed.research.team.title", descKey: "services.detailed.research.team.desc", itemsKey: "services.detailed.research.team.items" },
            { icon: "fa-lightbulb", titleKey: "services.detailed.research.advisory.title", descKey: "services.detailed.research.advisory.desc", itemsKey: "services.detailed.research.advisory.items" },
         ]
      },
      {
         num: "03",
         titleKey: "services.detailed.execution.title",
         subtitleKey: "services.detailed.execution.subtitle",
         cards: [
            { icon: "fa-gears", titleKey: "services.detailed.execution.agent.title", descKey: "services.detailed.execution.agent.desc", itemsKey: "services.detailed.execution.agent.items" },
            { icon: "fa-graduation-cap", titleKey: "services.detailed.execution.academy.title", descKey: "services.detailed.execution.academy.desc", itemsKey: "services.detailed.execution.academy.items" },
         ]
      },
   ];

   // Build sections from CMS or fall back
   const cmsServiceSections = [consultingSection, researchSection, executionSection];
   const hasCmsData = cmsServiceSections.some((s) => s != null);

   const sections = hasCmsData
      ? cmsServiceSections.filter(Boolean).map((section: any) => {
         const meta = section.metadata || {};
         const cmsCards = Array.isArray(meta.cards)
            ? meta.cards.map((card: any) => ({
               icon: card.icon,
               title: pick(card, 'title'),
               desc: pick(card, 'desc'),
               items: card[`items_${lang}`] || card.items_en || [],
            }))
            : [];
         return {
            num: meta.num || '',
            title: pick(section, 'title'),
            subtitle: pick(section, 'subtitle'),
            cards: cmsCards,
         };
      })
      : fallbackSections.map((section) => ({
         num: section.num,
         title: t(section.titleKey),
         subtitle: t(section.subtitleKey),
         cards: section.cards.map((card) => ({
            icon: card.icon,
            title: t(card.titleKey),
            desc: t(card.descKey),
            items: getTranslatedArray(t, card.itemsKey),
         })),
      }));

   // Header text from consulting section metadata or fallback
   const headerTag = consultingMeta ? pick(consultingMeta, 'tag') || t('services.detailed.tag') : t('services.detailed.tag');
   const headerTitle = consultingMeta ? pick(consultingMeta, 'header') || t('services.detailed.title') : t('services.detailed.title');

   return (
      <section className="detailed-services-section pt-100 pb-100 section-bg">
         <div className="container">
            {/* Section Header — same style as capabilities */}
            <div className="row mb-60 align-items-start">
               <div className="col-lg-6">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-lg-3 mb-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {headerTag}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".2s">
                        {headerTitle}
                     </h2>
                  </div>
               </div>
            </div>

            {/* 3 Service blocks */}
            <div className="ds-grid">
               {sections.map((section, sIdx) => (
                  <div key={section.num} className="ds-block wow fadeInUp" data-wow-delay={`${0.15 * (sIdx + 1)}s`}>
                     <div className="row">
                        {/* Left: Number + Title */}
                        <div className="col-lg-4">
                           <div className="ds-block-header">
                              <span className="ds-num">{section.num}</span>
                              <h3 className="theme-clr4 fw-700 mb-1">{section.title}</h3>
                              <span className="ds-subtitle">{section.subtitle}</span>
                           </div>
                        </div>

                        {/* Right: Two sub-service columns */}
                        <div className="col-lg-8">
                           <div className="row g-4">
                              {section.cards.map((card: any, cIdx: number) => (
                                 <div key={cIdx} className="col-md-6">
                                    <div className="ds-sub-card">
                                       <div className="d-flex align-items-center gap-2 mb-3">
                                          <div className="ds-sub-icon">
                                             <i className={`fa-solid ${card.icon}`}></i>
                                          </div>
                                          <h5 className="theme-clr4 fw-700 mb-0">{card.title}</h5>
                                       </div>
                                       <p className="ds-sub-desc">{card.desc}</p>
                                       <ul className="ds-check-list list-unstyled mb-0">
                                          {card.items.map((item: string, i: number) => (
                                             <li key={i}>
                                                <svg width="13" height="13" viewBox="0 0 20 20" fill="none" className="ds-check-icon">
                                                   <path d="M0.683 9.801C3.47 12.816 6.172 15.531 8.77 18.965C11.594 13.348 14.485 7.711 19.254 1.607L17.969 1.018C13.942 5.289 10.813 9.332 8.094 14.137C6.203 12.434 3.148 10.023 1.282 8.785L0.683 9.801Z" fill="var(--theme)"/>
                                                </svg>
                                                <span>{item}</span>
                                             </li>
                                          ))}
                                       </ul>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default DetailedServices;
