import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api } from "../../services/api";
import { useCmsData } from "../../hooks/useCmsData";
import { useLang } from "../../hooks/useLang";

interface DataType {
   title: string;
   /** Which CMS page to fetch breadcrumb from (e.g. 'about', 'services') */
   page?: string;
}

const BreadCrumb = ({ title, page }: DataType) => {
   const { t } = useTranslation();
   const { pick } = useLang();

   const pageName = page || title.toLowerCase();
   const { data: sections } = useCmsData(
      () => api.getPageContent(pageName),
      [] as any[]
   );

   const breadcrumb = sections.find((s: any) => s.section === 'breadcrumb');
   const bannerImage = breadcrumb?.imageUrl || '/assets/img/banner/breadcrumb-banner.png';
   const pageTitle = breadcrumb ? pick(breadcrumb, 'title') : t(`pages.${title.toLowerCase()}`);

   return (
      <div className="breadcrumb-banner section-bg position-relative">
         <div className="container">
            <img src={bannerImage} alt="img" className="w-100" loading="lazy" />
            <h1 className="breadcrumb-title">{pageTitle}</h1>
            <div className="boxes">
               <ul className="breadcrumb-cont d-flex flex-wrap align-items-center gap-md-3 gap-2">
                  <li className="theme-clr4 fw-500">
                     <Link to="/" className="fw-600">{t('pages.home')}</Link>
                  </li>
                  <li>
                     <i className="fa-solid fa-arrow-right"></i>
                  </li>
                  <li className="fz-16 theme-clr fw-500">
                     {pageTitle}
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default BreadCrumb
