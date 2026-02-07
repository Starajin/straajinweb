import { Link } from "react-router-dom"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface ProjectMeta {
   id: number;
   thumb: string;
   category: string;
   date: string;
   participants: number;
   status: 'completed' | 'ongoing' | 'upcoming';
}

const projects_meta: ProjectMeta[] = [
   { id: 1, thumb: "/assets/img/blog/financial-thumb1.png", category: "mou", date: "2023-03-15", participants: 50, status: "completed" },
   { id: 2, thumb: "/assets/img/blog/financial-thumb2.png", category: "cultural", date: "2023-05-20", participants: 150, status: "completed" },
   { id: 3, thumb: "/assets/img/blog/financial-thumb3.png", category: "publication", date: "2023-08-10", participants: 15, status: "completed" },
   { id: 4, thumb: "/assets/img/team/team1.png", category: "tour", date: "2025-03-15", participants: 30, status: "upcoming" },
   { id: 5, thumb: "/assets/img/team/team2.png", category: "cultural", date: "2024-06-20", participants: 40, status: "completed" },
   { id: 6, thumb: "/assets/img/team/team3.png", category: "mou", date: "2023-12-01", participants: 100, status: "ongoing" },
];

const categories = [
   { key: 'all', label: 'projects.filters.all' },
   { key: 'mou', label: 'projects.filters.mou' },
   { key: 'cultural', label: 'projects.filters.cultural' },
   { key: 'publication', label: 'projects.filters.publication' },
   { key: 'tour', label: 'projects.filters.tour' }
];

const ProjectsArea = () => {
   const { t, i18n } = useTranslation()
   const [activeFilter, setActiveFilter] = useState('all')

   const filteredProjects = activeFilter === 'all'
      ? projects_meta
      : projects_meta.filter(project => project.category === activeFilter)

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'completed': return 'bg-success text-white';
         case 'ongoing': return 'bg-primary text-white';
         case 'upcoming': return 'bg-warning text-dark';
         default: return 'bg-secondary text-white';
      }
   }

   const formatDate = (dateString: string) => {
      const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
      return new Date(dateString).toLocaleDateString(locale, {
         year: 'numeric',
         month: 'short',
         day: 'numeric'
      })
   }

   return (
      <>
         {/* Hero Section */}
         <section className="hero-section pt-100 pb-50">
            <div className="container">
               <div className="row g-lg-4 g-md-3 g-2 align-items-end mb-40">
                  <div className="col-lg-7 col-md-7">
                     <div className="section-header">
                        <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                           {t('projects.hero.title')}
                        </h2>
                     </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                     <div className="wow fadeInUp" data-wow-delay=".4s">
                        <p className="theme-clr4 mb-lg-4 mb-3">
                           {t('projects.hero.subtitle')}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Filter Section */}
         <section className="filter-section pb-50">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-10">
                     <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                        {categories.map((category) => (
                           <button
                              key={category.key}
                              onClick={() => setActiveFilter(category.key)}
                              className={`btn fw-600 px-4 py-2 rounded-pill transition-all project-filter-btn ${
                                 activeFilter === category.key
                                    ? 'active'
                                    : ''
                              }`}
                           >
                              <i className="fa-light fa-filter me-2"></i>
                              {t(category.label)}
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Projects Grid */}
         <section className="projects-section section-bg pt-50 pb-100">
            <div className="container">
               <div className="row g-4">
                  {filteredProjects.map((item) => {
                     const itemIndex = projects_meta.indexOf(item);
                     return (
                     <div key={item.id} className="col-md-6 col-lg-4">
                        <div className="project-card bg-white rounded-4 overflow-hidden shadow-sm hover-translate8 h-100">
                           {/* Image */}
                           <div className="position-relative">
                              <div className="thumb w-100 overflow-hidden" style={{height: '200px'}}>
                                 <img src={item.thumb} alt="img" className="w-100 h-100" style={{objectFit: 'cover'}} loading="lazy" />
                              </div>

                              {/* Status Badge */}
                              <div className="position-absolute top-3 end-3">
                                 <span className={`badge ${getStatusColor(item.status)} px-3 py-2 rounded-pill`}>
                                    {t(`projects.project.status.${item.status}`)}
                                 </span>
                              </div>
                           </div>

                           {/* Content */}
                           <div className="p-4 d-flex flex-column h-100">
                              <div className="flex-grow-1">
                                 <span className="badge bg-light text-primary fw-600 mb-2 px-3 py-2 rounded-pill">
                                    {t(`projects.categories.${item.category}`)}
                                 </span>

                                 <h5 className="theme-clr4 fw-bold mb-3 lh-sm">
                                    <Link to="/project-details" className="text-decoration-none theme-clr4 hover-theme1">
                                       {t(`projects.items.${itemIndex}.title`)}
                                    </Link>
                                 </h5>

                                 <p className="theme-clr4 mb-4 small lh-relaxed">
                                    {t(`projects.items.${itemIndex}.description`)}
                                 </p>

                                 {/* Meta Info */}
                                 <div className="meta-info mb-4">
                                    <div className="d-flex align-items-center mb-2 small text-muted">
                                       <i className="fa-light fa-calendar me-2"></i>
                                       {formatDate(item.date)}
                                    </div>
                                    <div className="d-flex align-items-center mb-2 small text-muted">
                                       <i className="fa-light fa-map-marker me-2"></i>
                                       {t(`projects.items.${itemIndex}.location`)}
                                    </div>
                                    <div className="d-flex align-items-center small text-muted">
                                       <i className="fa-light fa-users me-2"></i>
                                       {item.participants} {t('projects.project.participants')}
                                    </div>
                                 </div>
                              </div>

                              {/* CTA */}
                              <div className="mt-auto">
                                 <Link to="/project-details" 
                                    className="btn btn-outline-primary btn-sm w-100 d-flex align-items-center justify-content-center">
                                    <span>{t('projects.project.viewDetails')}</span>
                                    <i className="fa-light fa-arrow-right ms-2"></i>
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                     );
                  })}
               </div>
            </div>
         </section>
      </>
   )
}

export default ProjectsArea