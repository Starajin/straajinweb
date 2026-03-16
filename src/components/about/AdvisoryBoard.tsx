import { useTranslation } from "react-i18next";
import { api } from "../../services/api";
import { useCmsData } from "../../hooks/useCmsData";
import { useLang } from "../../hooks/useLang";

interface AdvisoryMember {
   id: number;
   image: string;
   name: string;
   designation: string;
   organization: string;
   imageStyle?: React.CSSProperties;
}

const AdvisoryBoard = () => {
   const { t } = useTranslation();
   const { pick } = useLang();

   const { data: cmsAdvisory } = useCmsData(() => api.getAdvisory(), [] as any[]);

   const advisoryMembers: AdvisoryMember[] = cmsAdvisory.length > 0
      ? cmsAdvisory.map((m: any) => ({
         id: m.id,
         image: m.imageUrl || '/assets/img/advisory/placeholder.jpg',
         name: pick(m, 'name'),
         designation: pick(m, 'designation'),
         organization: pick(m, 'organization'),
      }))
      : [
         {
            id: 2,
            image: "/assets/img/advisory/girish-desai.jpeg",
            name: t("about.advisory.members.girish.name"),
            designation: t("about.advisory.members.girish.designation"),
            organization: t("about.advisory.members.girish.organization"),
            imageStyle: { objectPosition: 'center 20%', transform: 'scale(1.15)' }
         },
         {
            id: 3,
            image: "/assets/img/advisory/sachin-itkar.jpeg",
            name: t("about.advisory.members.sachin.name"),
            designation: t("about.advisory.members.sachin.designation"),
            organization: t("about.advisory.members.sachin.organization"),
         },
         {
            id: 4,
            image: "/assets/img/advisory/nadish-vyas.jpg",
            name: t("about.advisory.members.nadish.name"),
            designation: t("about.advisory.members.nadish.designation"),
            organization: t("about.advisory.members.nadish.organization"),
         }
      ];

   const capabilities = [
      t('about.advisory.capabilities.item1'),
      t('about.advisory.capabilities.item2'),
      t('about.advisory.capabilities.item3')
   ];

   return (
      <section className="advisory-section pt-100 pb-100">
         <div className="container">
            {/* Section Header - Same as Team */}
            <div className="row g-sm-4 g-3 align-items-end mb-40">
               <div className="col-lg-8 col-md-8">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('about.advisory.tag')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('about.advisory.title')}
                     </h2>
                  </div>
               </div>
            </div>

            {/* Advisory Members Grid - Same card format as Team */}
            <div className="row g-4 justify-content-center mb-5">
               {advisoryMembers.map((member) => (
                  <div key={member.id} className="col-lg-3 col-md-6">
                     <div className="team-items hover-translate8 px-4 py-4 section-bg rounded-4 h-100">
                        <div className="thumb w-100 overflow-hidden mb-4">
                           <img
                              src={member.image}
                              alt={member.name}
                              className="w-100 rounded-3"
                              loading="lazy"
                              style={{height: '220px', objectFit: 'cover', objectPosition: 'top', ...member.imageStyle}}
                           />
                        </div>
                        <div className="content text-center">
                           <h5 className="mb-2 wow fadeInUp" data-wow-delay=".3s">
                              <span className="theme-clr4 lh-110 fw-600">
                                 {member.name}
                              </span>
                           </h5>
                           <span className="fz-14 d-block theme-clr fw-600 mb-2">{member.designation}</span>
                           <p className="fz-13 theme-clr4 mb-0" style={{lineHeight: '1.5'}}>
                              {member.organization}
                           </p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Capabilities Section */}
            <div className="row">
               <div className="col-12">
                  <div className="capabilities-box p-4 rounded-4 section-bg">
                     <h5 className="theme-clr4 fw-bold mb-4">
                        {t('about.advisory.capabilitiesTitle')}
                     </h5>
                     <ul className="list-unstyled mb-0">
                        {capabilities.map((item, index) => (
                           <li key={index} className="d-flex align-items-start mb-3">
                              <i className="fa-solid fa-chevron-right me-3 mt-1" style={{ color: 'var(--theme)' }}></i>
                              <span style={{ color: '#555', lineHeight: 1.6 }}>{item}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default AdvisoryBoard;
