import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Globe, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

interface TimelineItem {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  items: string[];
}

const KeyAchievements = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "Led G2B & B2B MoU signing ; Business Entry & network creation",
      icon: Building2,
      items: [
        "G2B MoU : Softberry with Rajasthan Government",
        "B2B MoU : Sogang Startup Innovation Center with i-Hub Divya Sampark",
        "Sogang University with IIT Roorkee"
      ]
    },
    {
      id: 2,
      title: "Culture Exchange Projects",
      icon: Globe,
      items: [
        "KOFICE Local Culture international Exchange project",
        "Launching Indian Bestseller Book <Super 30>, translated in Korean",
        "Organized <Korea Edu Tour 2025, Pune>, Networking with Educationist",
        "Advisor of <India-Korea Artist Camp> organized by Namisland Culture and education group"
      ]
    },
    {
      id: 3,
      title: "Various Business Consulting cases",
      icon: Briefcase,
      items: [
        "Incorporation 10+ / Partner matching 100+ / Strategy planning 15+",
        "JV Partner Due Diligence : 2+ / New Business plan consultation : 10+",
        "Opinion Lead(Seminar / Speaker / Column report / Market report) : 100+"
      ]
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section - No Background Color */}
      <div className="py-5">
        <div className="container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="row"
          >
            <div className="col-12">
              <motion.div 
                className="d-flex align-items-center gap-2 mb-3"
                initial={{ x: -30, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold">📊</span>
                  <span className="fw-bold">{t('achievements.title')}</span>
                </div>
              </motion.div>
              <motion.h2 
                className="text-dark fw-bold display-4 mb-0"
                initial={{ x: -50, opacity: 0, scale: 0.8 }}
                animate={inView ? { 
                  x: 0, 
                  opacity: 1, 
                  scale: 1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                } : {}}
                transition={{ 
                  delay: 0.5, 
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileInView={{
                  background: [
                    "linear-gradient(90deg, #333 0%, #333 100%)",
                    "linear-gradient(90deg, #023EDA 0%, #333 50%, #023EDA 100%)",
                    "linear-gradient(90deg, #333 0%, #333 100%)"
                  ],
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <motion.span
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  {t('achievements.mainTitle')}
                </motion.span>
                <br />
                <motion.span 
                  className="fw-300"
                  animate={{ 
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  {t('achievements.mainSubtitle')}
                </motion.span>
              </motion.h2>
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
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "#ffffff",
                    boxShadow: "0 20px 40px rgba(2, 62, 218, 0.2)",
                    transition: { duration: 0.3 }
                  }}
                  whileInView={{
                    backgroundColor: [
                      "#ffffff",
                      "#f8f9fa", 
                      "#e3f2fd",
                      "#ffffff"
                    ],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.5
                    }
                  }}
                  className="achievement-horizontal-card rounded-4 p-4 shadow-sm border"
                  style={{ 
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
                  }}
                >
                  <div className="d-flex align-items-start gap-4">
                    <motion.div 
                      className="achievement-icon-horizontal bg-primary d-flex align-items-center justify-content-center flex-shrink-0"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        backgroundColor: "#023EDA"
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={32} className="text-white" />
                    </motion.div>
                    <div className="flex-grow-1">
                      <div className="row">
                        <div className="col-lg-4 col-md-12">
                          <motion.h4 
                            className="fw-bold mb-3 text-primary lh-base"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.2 + 0.3 }}
                          >
                            {item.title}
                          </motion.h4>
                        </div>
                        <div className="col-lg-8 col-md-12">
                          <ul className="horizontal-list list-unstyled mb-0">
                            {item.items.map((listItem, idx) => (
                              <motion.li 
                                key={idx} 
                                className="horizontal-list-item text-muted mb-2 lh-base"
                                initial={{ opacity: 0, x: 30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ 
                                  delay: index * 0.2 + idx * 0.1 + 0.5,
                                  duration: 0.5 
                                }}
                                whileHover={{
                                  color: "#023EDA",
                                  x: 10,
                                  transition: { duration: 0.2 }
                                }}
                              >
                                <motion.span 
                                  className="bullet-point me-2"
                                  animate={{ 
                                    color: ["#023EDA", "#28a745", "#dc3545", "#023EDA"],
                                    scale: [1, 1.2, 1]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: idx * 0.3
                                  }}
                                >
                                  •
                                </motion.span>
                                {listItem}
                              </motion.li>
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
    </motion.section>
  );
}

export default KeyAchievements
