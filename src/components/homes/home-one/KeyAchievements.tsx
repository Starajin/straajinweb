import { motion } from "framer-motion";
import { Building2, Globe, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TimelineItem {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  items: string[];
}

const KeyAchievements = () => {
  const { t } = useTranslation();
  
  const achievementsData = t('achievements.stats', { returnObjects: true }) as any[];
  
  const timelineItems: TimelineItem[] = achievementsData.map((item, index) => ({
    id: index + 1,
    title: item.label + (item.description ? ` ; ${item.description}` : ''),
    icon: [Building2, Globe, Briefcase][index] || Building2,
    items: item.items
  }));

  return (
    <section className="py-0">
      {/* Header Section - No Background Color */}
      <div className="py-5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="row"
          >
            <div className="col-12">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold">📊</span>
                  <span className="fw-bold">{t('achievements.title')}</span>
                </div>
              </div>
              <h2 className="text-dark fw-bold display-4 mb-0">
                <span>{t('achievements.mainTitle')}</span>
                <br />
                <span className="fw-300">{t('achievements.mainSubtitle')}</span>
              </h2>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section - No Background */}
      <div className="py-5">
        <div className="container">
          {/* Horizontal Cards Layout */}
          <div className="row g-4">
            {timelineItems.map((item, index) => (
              <div key={item.id} className="col-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="achievement-horizontal-card rounded-4 p-4 shadow-sm border"
                  style={{ 
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                  }}
                >
                  <div className="d-flex align-items-start gap-4">
                    <div className="achievement-icon-horizontal bg-primary d-flex align-items-center justify-content-center flex-shrink-0">
                      <item.icon size={32} className="text-white" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="row">
                        <div className="col-lg-4 col-md-12">
                          <h4 className="fw-bold mb-3 text-dark lh-base">
                            {item.title}
                          </h4>
                        </div>
                        <div className="col-lg-8 col-md-12">
                          <ul className="horizontal-list list-unstyled mb-0">
                            {item.items.map((listItem, idx) => (
                              <li 
                                key={idx} 
                                className="horizontal-list-item text-muted mb-2 lh-base"
                              >
                                <span className="bullet-point me-2 text-primary">
                                  •
                                </span>
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default KeyAchievements
