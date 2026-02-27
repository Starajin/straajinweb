import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface HeroBannerProps {
   title: string;
   backgroundImage?: string;
}

const HeroBanner = ({ title, backgroundImage = "/assets/img/banner/breadcrumb-banner.png" }: HeroBannerProps) => {
   const { t } = useTranslation();

   return (
      <div className="hero-banner-custom">
         <div className="hero-image-container">
            <img
               src={backgroundImage}
               alt={`${title} banner`}
               className="hero-background-image"
            />
            <div className="hero-overlay"></div>
         </div>

         <div className="hero-content">
            <div className="container">
               <h1 className="hero-title">{title}</h1>
               <div className="hero-breadcrumb">
                  <nav className="breadcrumb-nav">
                     <Link to="/" className="breadcrumb-link">{t('pages.home')}</Link>
                     <span className="breadcrumb-separator">
                        <i className="fa-light fa-arrow-right"></i>
                     </span>
                     <span className="breadcrumb-current">{title}</span>
                  </nav>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeroBanner