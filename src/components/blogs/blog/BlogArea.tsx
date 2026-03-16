import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { api } from "../../../services/api"
import { useCmsData } from "../../../hooks/useCmsData"
import { useLang } from "../../../hooks/useLang"
import { resolveImageUrl } from "../../../utils/resolveImageUrl"
import blog_data from "../../../data/BlogData"

const BlogArea = () => {
   const { t } = useTranslation();
   const { pick } = useLang();

   const { data: cmsPosts } = useCmsData(() => api.getBlogPosts(), [] as any[]);
   const useCms = cmsPosts.length > 0;

   const displayPosts = useCms
      ? cmsPosts.map((p: any) => ({
         id: p.id,
         title: pick(p, 'title'),
         tag: p.category || '',
         thumb: resolveImageUrl(p.featuredImageUrl || ''),
         link: `/blog-details/${p.slug}`,
      }))
      : blog_data.filter((items) => items.page === "inner_page").map((item) => ({
         id: item.id,
         title: item.title,
         tag: item.tag,
         thumb: item.thumb,
         link: `/blog-details/${item.id}`,
      }));

   return (
      <section className="blog-section section-bg pt-100 pb-100">
         <div className="container">
            <div className="row g-sm-4 g-3 justify-content-between align-items-end mb-40">
               <div className="col-lg-6 col-md-7">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('insights.title', 'Insights')}
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        {t('blog.pageHeading', 'Stay Informed with the Latest Happenings!')}
                     </h2>
                  </div>
               </div>
               <div className="col-lg-6 col-md-5">
                  <div className="wow fadeInUp" data-wow-delay=".4s">
                     <p>
                        {t('blog.pageDescription', 'Explore insights on Korea-India business, trade relations, market entry strategies, and cross-cultural collaboration.')}
                     </p>
                  </div>
               </div>
            </div>
            <div className="row g-4">
               {displayPosts.map((item) => (
                  <div key={item.id} className="col-md-6 col-lg-4">
                     <div className="team-items hover-translate8 bg-white px-xxl-6 px-xl-4 px-3 section-bg rounded-4">
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
      </section>
   )
}

export default BlogArea
