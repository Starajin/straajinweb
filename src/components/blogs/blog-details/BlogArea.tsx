import { Link, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { api } from "../../../services/api"
import { useCmsData } from "../../../hooks/useCmsData"
import { useLang } from "../../../hooks/useLang"
import { resolveImageUrl } from "../../../utils/resolveImageUrl"
import blog_data from "../../../data/BlogData"

const BlogArea = () => {
   const { t } = useTranslation();
   const { pick } = useLang();
   const { id } = useParams();

   const { data: cmsPosts } = useCmsData(() => api.getBlogPosts(), [] as any[]);
   const useCms = cmsPosts.length > 0;

   // Exclude current post, show up to 3 related articles
   const relatedPosts = useCms
      ? cmsPosts
         .filter((p: any) => p.slug !== id && String(p.id) !== id)
         .slice(0, 3)
         .map((p: any) => ({
            id: p.id,
            title: pick(p, 'title'),
            tag: p.category || '',
            thumb: resolveImageUrl(p.featuredImageUrl || ''),
            link: `/blog-details/${p.slug}`,
         }))
      : blog_data.filter((items) => items.page === "home_1").map((item) => ({
         id: item.id,
         title: item.title,
         tag: item.tag,
         thumb: item.thumb,
         link: `/blog-details/${item.id}`,
      }));

   if (relatedPosts.length === 0) return null;

   return (
      <section className="blog-section section-bg pb-100">
         <div className="choose-partner-section pt-100 pb-100">
            <div className="container">
               <div className="row g-sm-4 g-3 align-items-end mb-40">
                  <div className="col-lg-12">
                     <div className="section-header">
                        <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                           <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('insights.title', 'Insights')}
                        </div>
                        <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                           {t('blog.relatedArticles', 'More Related Articles')}
                        </h2>
                     </div>
                  </div>
               </div>
               <div className="row g-4">
                  {relatedPosts.map((item) => (
                     <div key={item.id} className="col-md-6 col-lg-4">
                        <div className="team-items hover-translate8 px-xxl-6 px-xl-4 px-3 section-bg rounded-4">
                           <div className="thumb w-100 overflow-hidden">
                              <img src={item.thumb || '/assets/img/blog/placeholder.png'} alt={item.title} className="w-100 rounded-bottom-3" loading="lazy" style={{height: '220px', objectFit: 'cover'}} />
                           </div>
                           <div className="content d-flex align-items-end gap-3 justify-content-between">
                              <div>
                                 <span className="fz-14 theme-clr4 fw-500 mb-1">{item.tag}</span>
                                 <h5 className="max-270 wow fadeInUp" data-wow-delay=".3s">
                                    <Link to={item.link} className="theme-clr4 lh-110 fw-600">
                                       {item.title}
                                    </Link>
                                 </h5>
                              </div>
                              <Link to={item.link}
                                 className="theme-clr4 border hover-theme1 min-w-48 w-48 h-48 white-bg rounded-circle d-center d-xl-block d-none fs-five">
                                 <i className="fa-solid fa-arrow-right"></i>
                              </Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default BlogArea
