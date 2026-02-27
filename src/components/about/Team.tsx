import { useTranslation } from "react-i18next"

interface TeamMember {
   id: number;
   thumb: string;
   name: string;
   designation: string;
   description: string;
   linkedin: string;
}

const Team = () => {
   const { t } = useTranslation()

   const about_team_data: TeamMember[] = [
      {
         id: 1,
         thumb: "/assets/img/team/Yujin Han.jpeg",
         name: t('about.team.members.yujin.name'),
         designation: t('about.team.members.yujin.designation'),
         description: t('about.team.members.yujin.description'),
         linkedin: t('about.team.members.yujin.linkedin')
      },
      {
         id: 2,
         thumb: "/assets/img/team/Vijay Vyas.jpeg",
         name: t('about.team.members.vijay.name'),
         designation: t('about.team.members.vijay.designation'),
         description: t('about.team.members.vijay.description'),
         linkedin: t('about.team.members.vijay.linkedin')
      }
   ]

   return (
      <section className="teams-section pt-100 pb-100">
         <div className="container">
            <div className="row g-sm-4 g-3 align-items-end mb-40">
               <div className="col-lg-8 col-md-8">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('about.team.tag')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('about.team.title')}
                        <span className="fw-300"> {t('about.team.subtitle')}</span>
                     </h2>
                  </div>
               </div>
            </div>
            <div className="row g-4 justify-content-center">
               {about_team_data.map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="team-items hover-translate8 px-4 py-4 section-bg rounded-4 h-100">
                        <div className="thumb w-100 overflow-hidden mb-4">
                           <img src={item.thumb} alt="img" className="w-100 rounded-3" loading="lazy" style={{height: '380px', objectFit: 'contain'}} />
                        </div>
                        <div className="content text-center">
                           <h5 className="mb-2 wow fadeInUp" data-wow-delay=".3s">
                              <span className="theme-clr4 lh-110 fw-600">
                                 {item.name}
                              </span>
                           </h5>
                           <span className="fz-14 d-block theme-clr fw-600 mb-3">{item.designation}</span>
                           <p className="fz-14 theme-clr4 lh-relaxed mb-3" style={{lineHeight: '1.6'}}>
                              {item.description}
                           </p>
                           {item.linkedin && !item.linkedin.startsWith('about.team.') && (
                              <a href={item.linkedin} target="_blank" rel="noopener noreferrer"
                                 className="d-inline-flex align-items-center gap-2 mt-2"
                                 style={{ color: '#0A66C2', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                 <i className="fa-brands fa-linkedin" style={{ fontSize: '20px' }}></i>
                                 LinkedIn
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Team