import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { api } from "../../services/api";
import { useCmsData } from "../../hooks/useCmsData";
import { useLang } from "../../hooks/useLang";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const fallbackCategories = [
   { key: 'all', label: 'projects.filters.all' },
   { key: 'mou', label: 'projects.filters.mou' },
   { key: 'b2b', label: 'projects.filters.b2b' },
   { key: 'cultural', label: 'projects.filters.cultural' },
];

const ProjectsArea = () => {
   const { t } = useTranslation()
   const { pick } = useLang();
   const [activeFilter, setActiveFilter] = useState('all')
   const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null)

   const { data: sections } = useCmsData(() => api.getPageContent('projects'), [] as any[]);
   const heroSection = sections.find((s: any) => s.section === 'hero');
   const heroMeta = heroSection?.metadata || {};
   const cmsCategories = Array.isArray(heroMeta.categories) ? heroMeta.categories : null;

   const displayCategories = useMemo(() => {
      if (cmsCategories) {
         return cmsCategories.map((c: any) => ({ key: c.key, label: pick(c, 'label') }));
      }
      return fallbackCategories.map((c) => ({ key: c.key, label: t(c.label) }));
   }, [cmsCategories, pick, t]);

   const { data: cmsProjects } = useCmsData(() => api.getProjects(), [] as any[]);
   const useCms = cmsProjects.length > 0;

   const projects = useMemo(() => {
      if (!useCms) return [];
      return cmsProjects.map((p: any) => ({
         id: p.id,
         thumb: resolveImageUrl(p.featuredImageUrl || ''),
         gallery: Array.isArray(p.gallery) ? p.gallery.map((g: string) => resolveImageUrl(g)) : [],
         category: p.category || '',
         date: p.completionDate || p.createdAt || '',
         participants: p.participants || 0,
         title: pick(p, 'title'),
         description: pick(p, 'description'),
      }));
   }, [cmsProjects, useCms, pick]);

   const filteredProjects = useMemo(() => {
      const source = projects;
      const filtered = activeFilter === 'all'
         ? [...source]
         : source.filter((project: any) => project.category === activeFilter);
      return filtered.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
   }, [projects, activeFilter]);


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
               image-orientation: from-image;
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
               image-orientation: from-image;
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
                        {heroSection ? pick(heroSection, 'title') : t('projects.hero.title')}
                     </h2>
                  </div>
                  <div className="col-lg-5 col-md-5">
                     <p className="wow fadeInUp" data-wow-delay=".4s" style={{ color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>
                        {heroSection ? pick(heroSection, 'subtitle') : t('projects.hero.subtitle')}
                     </p>
                  </div>
               </div>

               {/* Filters */}
               <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                  {displayCategories.map((category: any) => (
                     <button
                        key={category.key}
                        onClick={() => setActiveFilter(category.key)}
                        className={`prj-filter-btn ${activeFilter === category.key ? 'active' : ''}`}
                     >
                        {category.label}
                     </button>
                  ))}
               </div>

               {/* Grid */}
               <div className="row g-4">
                  {filteredProjects.map((item: any) => {
                     const allImages = [item.thumb, ...item.gallery];
                     return (
                     <div key={item.id} className="col-md-6 col-lg-4">
                        <div className="prj-card">
                           {/* Thumbnail */}
                           <div className="prj-card__thumb" onClick={() => openLightbox(allImages, 0)}>
                              <img src={item.thumb} alt={item.title} loading="lazy" />
                              <div className="prj-card__overlay">
                                 <i className="fa-solid fa-expand" />
                              </div>
                           </div>

                           {/* Body */}
                           <div className="prj-card__body">
                              <div className="prj-card__cat">
                                 {displayCategories.find((c: any) => c.key === item.category)?.label || t(`projects.categories.${item.category}`)}
                              </div>
                              <h5 className="prj-card__title">
                                 {item.title}
                              </h5>
                              <p className="prj-card__desc">
                                 {item.description}
                              </p>
                           </div>

                           {/* Gallery strip */}
                           {item.gallery.length > 0 && (
                              <div className="prj-card__gallery">
                                 {item.gallery.slice(0, 4).map((img: string, idx: number) => (
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
