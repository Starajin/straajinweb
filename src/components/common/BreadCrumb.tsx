import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DataType {
   title: string;
}
const BreadCrumb = ({ title }: DataType) => {
   const { t } = useTranslation();
   
   return (
      <div className="breadcrumb-banner section-bg position-relative">
         <div className="container">
            <img src="/assets/img/banner/breadcrumb-banner.png" alt="img" className="w-100" loading="lazy" />
            <h1 className="breadcrumb-title">{t(`pages.${title.toLowerCase()}`)}</h1>
            <div className="boxes">
               <ul className="breadcrumb-cont d-flex flex-wrap align-items-center gap-md-3 gap-2">
                  <li className="theme-clr4 fw-500">
                     <Link to="/" className="fw-600">{t('pages.home')}</Link>
                  </li>
                  <li>
                     <i className="fa-solid fa-arrow-right"></i>
                  </li>
                  <li className="fz-16 theme-clr fw-500">
                     {t(`pages.${title.toLowerCase()}`)}
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default BreadCrumb
