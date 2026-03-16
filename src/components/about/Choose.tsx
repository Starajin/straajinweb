import { useTranslation } from "react-i18next";
import { api } from "../../services/api";
import { useCmsData } from "../../hooks/useCmsData";
import { useLang } from "../../hooks/useLang";

interface CredentialItem {
   id: number;
   stat: string;
   label: string;
   desc: string;
}

const Choose = () => {
   const { t } = useTranslation();
   const { pick } = useLang();

   const { data: sections } = useCmsData(() => api.getPageContent('about'), [] as any[]);
   const whySection = sections.find((s: any) => s.section === 'why-choose');
   const stats = whySection?.metadata?.stats;
   const useCms = Array.isArray(stats) && stats.length > 0;

   const credentials: CredentialItem[] = useCms
      ? stats.map((s: any, i: number) => ({
         id: i + 1,
         stat: s.value || '',
         label: pick(s, 'label'),
         desc: pick(s, 'desc'),
      }))
      : [
         { id: 1, stat: "18+", label: t('about.choose.achievements.experienceLabel'), desc: t('about.choose.achievements.experienceDesc') },
         { id: 2, stat: "1000+", label: t('about.choose.achievements.networkLabel'), desc: t('about.choose.achievements.networkDesc') },
         { id: 3, stat: "50+", label: t('about.choose.achievements.casesLabel'), desc: t('about.choose.achievements.casesDesc') },
         { id: 4, stat: "100%", label: t('about.choose.achievements.supportLabel'), desc: t('about.choose.achievements.supportDesc') },
      ];

   return (
      <section className="credentials-section">
         <div className="credentials-bg">
            <div className="container">
               <div className="cred-strip">
                  {credentials.map((item, idx) => (
                     <div key={item.id} className="cred-item wow fadeInUp" data-wow-delay={`${0.1 * (idx + 1)}s`}>
                        <span className="cred-stat">{item.stat}</span>
                        <span className="cred-label">{item.label}</span>
                        <span className="cred-desc">{item.desc}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

export default Choose;
