import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface TeamMember {
   id: number;
   thumb: string;
   name: string;
   designation: string;
   description: string;
}

const Team = () => {
   const { t } = useTranslation()

   const about_team_data: TeamMember[] = [
      {
         id: 1,
         thumb: "/assets/img/team/team1.png",
         name: t('about.team.members.yujin.name'),
         designation: t('about.team.members.yujin.designation'),
         description: t('about.team.members.yujin.description')
      },
      {
         id: 2,
         thumb: "/assets/img/team/team2.png",
         name: t('about.team.members.vijay.name'),
         designation: t('about.team.members.vijay.designation'),
         description: t('about.team.members.vijay.description')
      },
      {
         id: 3,
         thumb: "/assets/img/team/team3.png",
         name: t('about.team.members.young.name'),
         designation: t('about.team.members.young.designation'),
         description: t('about.team.members.young.description')
      },
      {
         id: 4,
         thumb: "/assets/img/team/member4.png",
         name: t('about.team.members.james.name'),
         designation: t('about.team.members.james.designation'),
         description: t('about.team.members.james.description')
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
               <div className="col-lg-4 col-md-4">
                  <div className="text-md-end wow fadeInUp" data-wow-delay=".4s">
                     <Link to="/team" className="theme-btn style1 pe-20">
                        <i
                           className="fa-solid fa-arrow-right w-36 h-36 bg-white rounded-circle d-center fz-14 theme-clr4"></i>
                        {t('about.team.viewAll')}
                     </Link>
                  </div>
               </div>
            </div>
            <div className="row g-4 justify-content-center">
               {about_team_data.map((item) => (
                  <div key={item.id} className="col-lg-3 col-md-6">
                     <div className="team-items hover-translate8 px-4 py-4 section-bg rounded-4 h-100">
                        <div className="thumb w-100 overflow-hidden mb-4">
                           <img src={item.thumb} alt="img" className="w-100 rounded-3" style={{height: '250px', objectFit: 'cover'}} />
                        </div>
                        <div className="content text-center">
                           <h5 className="mb-2 wow fadeInUp" data-wow-delay=".3s">
                              <Link to="/team-details" className="theme-clr4 lh-110 fw-600">
                                 {item.name}
                              </Link>
                           </h5>
                           <span className="fz-14 d-block theme-clr fw-600 mb-3">{item.designation}</span>
                           <p className="fz-14 theme-clr4 lh-relaxed mb-3" style={{lineHeight: '1.6'}}>
                              {item.description}
                           </p>
                           <Link to="/team-details"
                              className="theme-btn style2 pe-3 mt-3">
                              <i className="fa-solid fa-arrow-right w-32 h-32 bg-white rounded-circle d-center fz-12 theme-clr4 me-2"></i>
                              {t('about.team.viewProfile')}
                           </Link>
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