import { useState } from "react"
import { useTranslation } from "react-i18next"

interface ProjectMeta {
   id: number;
   thumb: string;
   gallery: string[];
   category: string;
   date: string;
   participants: number;
   thumbStyle?: React.CSSProperties;
}

const projects_meta: ProjectMeta[] = [
   {
      id: 1,
      thumb: "/assets/img/projects/MIDC_KOSME_Meeting_2026.jpg",
      gallery: [],
      category: "mou",
      date: "2026-01-15",
      participants: 50,
   },
   {
      id: 2,
      thumb: "/assets/img/projects/rajasthan-softberry-mou-4person.jpg",
      gallery: ["/assets/img/projects/rising-rajasthan-event.jpg", "/assets/img/projects/rajasthan-softberry-mou.jpg", "/assets/img/projects/rajasthan-cm-korea-visit.jpg"],
      category: "mou",
      date: "2024-12-15",
      participants: 200,
   },
   {
      id: 3,
      thumb: "/assets/img/projects/pcu-kosme-mou-signing.jpg",
      gallery: ["/assets/img/projects/PCU - Korean Facilitation Centre MOU Ceremony.jpg", "/assets/img/projects/PCU - KOSME MOU Signing Ceremony2.jpg", "/assets/img/projects/pcu-inauguration-facilitation.jpg", "/assets/img/projects/kosme-facilitation-pcu.jpg", "/assets/img/projects/pcet-gbc-ceremony.jpg"],
      category: "mou",
      date: "2024-09-20",
      participants: 120,
   },
   {
      id: 4,
      thumb: "/assets/img/projects/sogang-ihub-mou-2024.jpg",
      gallery: ["/assets/img/projects/i-Hub Embassy Visit_2024.jpg"],
      category: "mou",
      date: "2024-07-10",
      participants: 60,
   },
   {
      id: 5,
      thumb: "/assets/img/projects/sogang-pcu-mou-signing.jpg",
      gallery: [],
      category: "mou",
      date: "2024-05-15",
      participants: 80,
   },
   {
      id: 6,
      thumb: "/assets/img/projects/verywords-starajin-mou.jpg",
      gallery: ["/assets/img/projects/verywords-starajin-mou-signing.jpg"],
      category: "mou",
      date: "2024-03-20",
      participants: 40,
   },
   {
      id: 7,
      thumb: "/assets/img/projects/kofice-culture-project-1.jpg",
      gallery: ["/assets/img/projects/kofice-culture-project-2.jpg", "/assets/img/projects/KOFICE Cultural Project 2021_Promotion Poster_1.jpg", "/assets/img/projects/KOFICE Cultural Project 2021_Main Poster.jpg", "/assets/img/projects/NBT_National Book Trust Visit_2023.jpg"],
      category: "cultural",
      date: "2025-01-20",
      participants: 150,
   },
   {
      id: 8,
      thumb: "/assets/img/projects/super-30-publication-icck.jpg",
      gallery: ["/assets/img/projects/super-30-book-concert.jpg", "/assets/img/projects/super-30-anand-kumar.jpg", "/assets/img/projects/super-30-book-concert-1.jpg", "/assets/img/projects/super-30-original-book.jpg", "/assets/img/projects/Anand Kumar_Embassy Visit_1.jpg"],
      category: "cultural",
      date: "2024-06-15",
      participants: 300,
   },
   {
      id: 9,
      thumb: "/assets/img/projects/nami-island-artist-camp.jpg",
      gallery: [],
      category: "cultural",
      date: "2022-10-05",
      participants: 40,
   },
   {
      id: 10,
      thumb: "/assets/img/projects/icck-diwali-ball-2024-cropped.jpg",
      gallery: ["/assets/img/projects/icck-networking-2025-rotated.jpg", "/assets/img/projects/icck-annual-meeting-2023.jpg", "/assets/img/projects/1747997143162.jpg", "/assets/img/projects/1747997142979.jpg"],
      category: "cultural",
      date: "2020-08-20",
      participants: 100,
   },
   {
      id: 11,
      thumb: "/assets/img/projects/KOIMA_B2B matching Forum_2023.jpg",
      gallery: ["/assets/img/projects/KOIMA_B2B Meeting Forum_2023_3.jpg", "/assets/img/projects/Rossari in Korea_1.jpg"],
      category: "b2b",
      date: "2025-10-27",
      participants: 200,
   },
   {
      id: 12,
      thumb: "/assets/img/projects/OKTA 2025_2.jpg",
      gallery: ["/assets/img/projects/OKTA World Incheon_B2B meeting 1.jpg", "/assets/img/projects/OKTA 2025_1.jpg", "/assets/img/projects/OKTA 2025_3.jpg", "/assets/img/projects/OKTA World Business Expo_B2B meeting 2.jpg"],
      category: "b2b",
      date: "2025-06-20",
      participants: 180,
   },
   {
      id: 13,
      thumb: "/assets/img/projects/EDUCON 2024_2 (1).jpg",
      gallery: ["/assets/img/projects/EDUCON 2024_2.jpg", "/assets/img/projects/EDUCON 2024_1.jpg", "/assets/img/projects/DIDAC Edu Exhibition 2025_1.jpg", "/assets/img/projects/DIDAC Edu Exhibition 2025_2.jpg", "/assets/img/projects/DIDAC Edu Exhibition 2025_4.jpg"],
      category: "b2b",
      date: "2025-05-15",
      participants: 350,
   },
   {
      id: 14,
      thumb: "/assets/img/projects/kto-edutour-pune.jpg",
      gallery: ["/assets/img/projects/kto-edutour-hyd.jpg", "/assets/img/projects/kto-edutour-roadshow-hyd-2025.jpg", "/assets/img/projects/edu-tour-hyd-2025.jpg", "/assets/img/projects/kto-edutour-pune-2025-2.jpg", "/assets/img/projects/kto-edutour-pune-2025-3.jpg"],
      category: "b2b",
      date: "2025-04-15",
      participants: 250,
   },
   {
      id: 15,
      thumb: "/assets/img/projects/sogang-thub-hyd-visit-2025.jpg",
      gallery: ["/assets/img/projects/korea-smes-startups-day.jpg", "/assets/img/projects/india-forum-2026.jpg", "/assets/img/projects/gec-2025.jpg", "/assets/img/projects/proclamation-ceremony-smes.jpg", "/assets/img/projects/K-SS Day_2025_2.jpg", "/assets/img/projects/Proclamation Ceremony – Korea SMEs & Startups Day 2025.jpg", "/assets/img/projects/Sogang_T-Hub Visit 2.jpg"],
      category: "b2b",
      date: "2025-03-10",
      participants: 400,
   },
   {
      id: 16,
      thumb: "/assets/img/projects/gs-patanjali-b2b.jpg",
      gallery: ["/assets/img/projects/rossari-b2b-exhibition.jpg", "/assets/img/projects/b2b-meeting-2024.jpg", "/assets/img/projects/b2b-meeting-2024-2.jpg", "/assets/img/projects/b2b-beautysum-2025.jpg", "/assets/img/projects/ofkos-b2b-meeting-1.jpg", "/assets/img/projects/KRAFTON Meeting_Anil Sinha_2024.jpg", "/assets/img/projects/OFKOS_B2B Meeting 2.jpg", "/assets/img/projects/Rossari in Korea_1.jpg", "/assets/img/projects/Medical Cosmetic_B2B Meeting_MoU_2025_1.jpg", "/assets/img/projects/Jagruti Technical_ Meeting.jpg", "/assets/img/projects/20250529_165357.jpg", "/assets/img/projects/20250530_113143.jpg", "/assets/img/projects/1748511114771.jpg", "/assets/img/projects/1748511114268.jpg", "/assets/img/projects/MNU_Mokpo National University Meeting.jpg", "/assets/img/projects/Resized_20240221_204432_1708580028330.jpeg"],
      category: "b2b",
      date: "2024-08-10",
      participants: 150,
   },
];

const categories = [
   { key: 'all', label: 'projects.filters.all' },
   { key: 'mou', label: 'projects.filters.mou' },
   { key: 'b2b', label: 'projects.filters.b2b' },
   { key: 'cultural', label: 'projects.filters.cultural' },
];

const ProjectsArea = () => {
   const { t, i18n } = useTranslation()
   const [activeFilter, setActiveFilter] = useState('all')
   const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

   const filteredProjects = (activeFilter === 'all'
      ? [...projects_meta]
      : projects_meta.filter(project => project.category === activeFilter)
   ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

   const formatDate = (dateString: string) => {
      const locale = i18n.language === 'ko' ? 'ko-KR' : 'en-US';
      return new Date(dateString).toLocaleDateString(locale, {
         year: 'numeric',
         month: 'short',
      })
   }

   const openLightbox = (images: string[], index: number) => {
      setLightbox({ images, index });
      document.body.style.overflow = 'hidden';
   }

   const closeLightbox = () => {
      setLightbox(null);
      document.body.style.overflow = '';
   }

   return (
      <>
         <style>{`
            /* ── Filter buttons ── */
            .prj-filter-btn {
               background: #fff;
               border: 1.5px solid #e5e7eb;
               color: #374151;
               font-size: 13px;
               padding: 8px 20px;
               border-radius: 100px;
               cursor: pointer;
               transition: all 0.25s ease;
               font-weight: 600;
            }
            .prj-filter-btn:hover {
               border-color: var(--theme);
               color: var(--theme);
            }
            .prj-filter-btn.active {
               background: var(--theme);
               border-color: var(--theme);
               color: #fff;
            }

            /* ── Project card ── */
            .prj-card {
               background: #fff;
               border-radius: 16px;
               overflow: hidden;
               border: 1px solid rgba(0,0,0,0.06);
               transition: all 0.35s ease;
               height: 100%;
               display: flex;
               flex-direction: column;
            }
            .prj-card:hover {
               transform: translateY(-6px);
               box-shadow: 0 16px 40px rgba(0,0,0,0.1);
            }

            .prj-card__thumb {
               position: relative;
               height: 220px;
               overflow: hidden;
               cursor: pointer;
            }
            .prj-card__thumb img {
               width: 100%;
               height: 100%;
               object-fit: cover;
               transition: transform 0.5s ease;
            }
            .prj-card:hover .prj-card__thumb img {
               transform: scale(1.05);
            }

            .prj-card__overlay {
               position: absolute;
               inset: 0;
               background: rgba(0,0,0,0.35);
               display: flex;
               align-items: center;
               justify-content: center;
               opacity: 0;
               transition: opacity 0.3s ease;
            }
            .prj-card:hover .prj-card__overlay {
               opacity: 1;
            }
            .prj-card__overlay i {
               color: #fff;
               font-size: 24px;
               background: rgba(255,255,255,0.2);
               width: 48px;
               height: 48px;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               backdrop-filter: blur(4px);
            }

            .prj-card__body {
               padding: 20px 24px 24px;
               flex: 1;
               display: flex;
               flex-direction: column;
            }

            .prj-card__cat {
               font-size: 11px;
               font-weight: 700;
               text-transform: uppercase;
               letter-spacing: 1px;
               color: var(--theme);
               margin-bottom: 8px;
            }

            .prj-card__title {
               font-size: 16px;
               font-weight: 700;
               color: #1a1a2e;
               line-height: 1.4;
               margin-bottom: 10px;
            }

            .prj-card__desc {
               font-size: 13px;
               color: rgba(0,0,0,0.55);
               line-height: 1.65;
               margin-bottom: 16px;
               flex: 1;
            }

            .prj-card__meta {
               display: flex;
               align-items: center;
               gap: 16px;
               font-size: 12px;
               color: rgba(0,0,0,0.4);
               padding-top: 14px;
               border-top: 1px solid rgba(0,0,0,0.06);
            }
            .prj-card__meta i {
               margin-right: 5px;
               font-size: 11px;
            }

            /* ── Gallery strip ── */
            .prj-card__gallery {
               display: flex;
               gap: 4px;
               padding: 0 24px 20px;
            }
            .prj-card__gallery-thumb {
               width: 48px;
               height: 36px;
               border-radius: 6px;
               overflow: hidden;
               cursor: pointer;
               opacity: 0.7;
               transition: opacity 0.2s ease;
               border: 1px solid rgba(0,0,0,0.08);
            }
            .prj-card__gallery-thumb:hover {
               opacity: 1;
            }
            .prj-card__gallery-thumb img {
               width: 100%;
               height: 100%;
               object-fit: cover;
            }
            .prj-card__gallery-more {
               width: 48px;
               height: 36px;
               border-radius: 6px;
               background: rgba(0,0,0,0.05);
               display: flex;
               align-items: center;
               justify-content: center;
               font-size: 11px;
               font-weight: 700;
               color: rgba(0,0,0,0.4);
               cursor: pointer;
            }

            /* ── Lightbox ── */
            .prj-lightbox {
               position: fixed;
               inset: 0;
               z-index: 9999;
               background: rgba(0,0,0,0.92);
               display: flex;
               align-items: center;
               justify-content: center;
               animation: prjFadeIn 0.25s ease;
            }
            @keyframes prjFadeIn {
               from { opacity: 0; }
               to { opacity: 1; }
            }
            .prj-lightbox__close {
               position: absolute;
               top: 20px;
               right: 24px;
               color: #fff;
               font-size: 28px;
               cursor: pointer;
               z-index: 10;
               opacity: 0.7;
               transition: opacity 0.2s ease;
               background: none;
               border: none;
            }
            .prj-lightbox__close:hover { opacity: 1; }
            .prj-lightbox__img {
               max-width: 90vw;
               max-height: 85vh;
               object-fit: contain;
               border-radius: 8px;
            }
            .prj-lightbox__nav {
               position: absolute;
               top: 50%;
               transform: translateY(-50%);
               color: #fff;
               font-size: 32px;
               cursor: pointer;
               opacity: 0.6;
               transition: opacity 0.2s ease;
               background: rgba(255,255,255,0.1);
               border: none;
               width: 48px;
               height: 48px;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
            }
            .prj-lightbox__nav:hover { opacity: 1; }
            .prj-lightbox__nav--prev { left: 20px; }
            .prj-lightbox__nav--next { right: 20px; }
            .prj-lightbox__counter {
               position: absolute;
               bottom: 20px;
               left: 50%;
               transform: translateX(-50%);
               color: rgba(255,255,255,0.6);
               font-size: 13px;
            }

            @media (max-width: 767px) {
               .prj-card__thumb { height: 180px; }
               .prj-card__body { padding: 16px 18px 18px; }
               .prj-card__gallery { padding: 0 18px 16px; }
            }
         `}</style>

         {/* Projects Section */}
         <section className="section-bg" style={{ paddingTop: '50px', paddingBottom: '72px' }}>
            <div className="container">
               {/* Hero header */}
               <div className="row g-lg-4 g-md-3 g-2 align-items-end mb-4">
                  <div className="col-lg-7 col-md-7">
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('projects.hero.title')}
                     </h2>
                  </div>
                  <div className="col-lg-5 col-md-5">
                     <p className="wow fadeInUp" data-wow-delay=".4s" style={{ color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>
                        {t('projects.hero.subtitle')}
                     </p>
                  </div>
               </div>

               {/* Filters */}
               <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                  {categories.map((category) => (
                     <button
                        key={category.key}
                        onClick={() => setActiveFilter(category.key)}
                        className={`prj-filter-btn ${activeFilter === category.key ? 'active' : ''}`}
                     >
                        {t(category.label)}
                     </button>
                  ))}
               </div>

               {/* Grid */}
               <div className="row g-4">
                  {filteredProjects.map((item) => {
                     const itemIndex = projects_meta.indexOf(item);
                     const allImages = [item.thumb, ...item.gallery];
                     return (
                     <div key={item.id} className="col-md-6 col-lg-4">
                        <div className="prj-card">
                           {/* Thumbnail */}
                           <div className="prj-card__thumb" onClick={() => openLightbox(allImages, 0)}>
                              <img src={item.thumb} alt={t(`projects.items.${itemIndex}.title`)} loading="lazy" style={item.thumbStyle} />
                              <div className="prj-card__overlay">
                                 <i className="fa-solid fa-expand" />
                              </div>
                           </div>

                           {/* Body */}
                           <div className="prj-card__body">
                              <div className="prj-card__cat">
                                 {t(`projects.categories.${item.category}`)}
                              </div>
                              <h5 className="prj-card__title">
                                 {t(`projects.items.${itemIndex}.title`)}
                              </h5>
                              <p className="prj-card__desc">
                                 {t(`projects.items.${itemIndex}.description`)}
                              </p>
                              <div className="prj-card__meta">
                                 <span>
                                    <i className="fa-solid fa-calendar" />
                                    {formatDate(item.date)}
                                 </span>
                                 <span>
                                    <i className="fa-solid fa-location-dot" />
                                    {t(`projects.items.${itemIndex}.location`)}
                                 </span>
                              </div>
                           </div>

                           {/* Gallery strip */}
                           {item.gallery.length > 0 && (
                              <div className="prj-card__gallery">
                                 {item.gallery.slice(0, 4).map((img, idx) => (
                                    <div
                                       key={idx}
                                       className="prj-card__gallery-thumb"
                                       onClick={() => openLightbox(allImages, idx + 1)}
                                    >
                                       <img src={img} alt="" loading="lazy" />
                                    </div>
                                 ))}
                                 {item.gallery.length > 4 && (
                                    <div
                                       className="prj-card__gallery-more"
                                       onClick={() => openLightbox(allImages, 5)}
                                    >
                                       +{item.gallery.length - 4}
                                    </div>
                                 )}
                              </div>
                           )}
                        </div>
                     </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* Lightbox */}
         {lightbox && (
            <div className="prj-lightbox" onClick={closeLightbox}>
               <button className="prj-lightbox__close" onClick={closeLightbox}>
                  <i className="fa-solid fa-xmark" />
               </button>
               {lightbox.images.length > 1 && (
                  <>
                     <button
                        className="prj-lightbox__nav prj-lightbox__nav--prev"
                        onClick={(e) => {
                           e.stopPropagation();
                           setLightbox(prev => prev ? {
                              ...prev,
                              index: (prev.index - 1 + prev.images.length) % prev.images.length
                           } : null);
                        }}
                     >
                        <i className="fa-solid fa-chevron-left" />
                     </button>
                     <button
                        className="prj-lightbox__nav prj-lightbox__nav--next"
                        onClick={(e) => {
                           e.stopPropagation();
                           setLightbox(prev => prev ? {
                              ...prev,
                              index: (prev.index + 1) % prev.images.length
                           } : null);
                        }}
                     >
                        <i className="fa-solid fa-chevron-right" />
                     </button>
                  </>
               )}
               <img
                  className="prj-lightbox__img"
                  src={lightbox.images[lightbox.index]}
                  alt=""
                  onClick={(e) => e.stopPropagation()}
               />
               <div className="prj-lightbox__counter">
                  {lightbox.index + 1} / {lightbox.images.length}
               </div>
            </div>
         )}
      </>
   )
}

export default ProjectsArea
