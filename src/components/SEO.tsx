import { Helmet } from "react-helmet-async";

interface SEOProps {
  pageTitle: string;
  description?: string;
  ogImage?: string;
}

const DEFAULT_DESC = "StaraJIN bridges Korea and India through expert business consulting, market entry strategy, partner matching, and cultural exchange programs.";

const SEO = ({ pageTitle, description = DEFAULT_DESC, ogImage = "/assets/img/logo/Starajin LogoX3.png" }: SEOProps) => {
  const fullTitle = `${pageTitle} | StaraJIN — Korea-India Business Consulting`;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{fullTitle}</title>
      <meta name="robots" content="index, follow" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
