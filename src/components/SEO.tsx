import { Helmet } from "react-helmet-async";

interface SEOProps {
  pageTitle: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const DEFAULT_DESC = "StaraJIN bridges Korea and India through expert business consulting, market entry strategy, partner matching, and cultural exchange programs.";
const DEFAULT_KEYWORDS = "Korea-India business consulting, India market entry for Korean companies, India JV advisory, Korea India trade and investment, India execution support, Korean business in India, India joint venture, market entry strategy, partner matching, cultural exchange";

const SITE_URL = "https://www.starajin.com";

const SEO = ({ pageTitle, description = DEFAULT_DESC, keywords = DEFAULT_KEYWORDS, ogImage = "/assets/img/logo/Starajin LogoX3.png" }: SEOProps) => {
  const fullTitle = `${pageTitle} | StaraJIN — Korea-India Business Consulting`;
  const canonicalUrl = `${SITE_URL}${window.location.pathname}`;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="StaraJIN" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
    </Helmet>
  );
};

export default SEO;
