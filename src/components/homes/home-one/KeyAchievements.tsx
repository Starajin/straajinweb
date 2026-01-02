import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface AchievementItem {
  number: string;
  label: string;
  description: string;
  items: string[];
}

const KeyAchievements = () => {
  const { t } = useTranslation();
  
  const achievementsData = t('achievements.stats', { returnObjects: true }) as AchievementItem[];

  // Icon configurations matching the theme
  const iconConfig = [
    {
      icon: "fa-solid fa-handshake",
      gradient: "linear-gradient(135deg, var(--theme) 0%, var(--theme3) 100%)",
      image: "/assets/img/service/service-thumb10.png"
    },
    {
      icon: "fa-solid fa-globe",
      gradient: "linear-gradient(135deg, var(--theme2) 0%, var(--theme) 100%)",
      image: "/assets/img/service/Cultural Planning.jpg"
    },
    {
      icon: "fa-solid fa-briefcase",
      gradient: "linear-gradient(135deg, var(--theme3) 0%, var(--theme) 100%)",
      image: "/assets/img/service/B2b.jpg"
    }
  ];

  return (
    <section className="section-bg py-100">
      <div className="container">
        {/* Header */}
        <div className="row g-lg-4 g-md-3 g-2 align-items-end mb-60">
          <div className="col-lg-6 col-md-7">
            <div className="section-header">
              <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
                <img src="/assets/img/icon/section-step1.png" alt="img" /> {t('achievements.title')}
              </div>
              <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                {t('achievements.mainTitle')}
                <span className="fw-300 d-block">{t('achievements.mainSubtitle')}</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="row g-4">
          {achievementsData.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="achievement-card h-100 rounded-4 overflow-hidden hover-translate8"
                style={{
                  background: '#ffffff',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  position: 'relative'
                }}
              >
                {/* Image Header */}
                <div className="achievement-card-image position-relative" style={{ height: '180px', overflow: 'visible' }}>
                  <div style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src={iconConfig[index].image} 
                      alt={item.label}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                  
                  {/* Floating Icon Circle */}
                  <div 
                    className="position-absolute"
                    style={{
                      bottom: '-30px',
                      left: '30px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      zIndex: 2
                    }}
                  >
                    <i 
                      className={iconConfig[index].icon}
                      style={{
                        fontSize: '24px',
                        color: 'var(--theme)'
                      }}
                    ></i>
                  </div>
                </div>

                {/* Card Content */}
                <div className="achievement-card-content p-4" style={{ paddingTop: '50px' }}>
                  {/* Number Badge */}
                  <div className="mb-3">
                    <span 
                      className="achievement-number fw-bold d-inline-block px-3 py-1 rounded-pill"
                      style={{
                        background: 'var(--theme)',
                        color: '#ffffff',
                        fontSize: '20px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="fw-bold theme-clr4 mb-2 lh-base">
                    {item.label}
                  </h4>
                  {item.description && (
                    <p className="text-muted mb-3 fz-14">{item.description}</p>
                  )}

                  {/* Divider */}
                  <div 
                    className="mb-3"
                    style={{
                      height: '2px',
                      width: '40px',
                      background: 'var(--theme2)',
                      borderRadius: '2px'
                    }}
                  ></div>

                  {/* Items List */}
                  <ul className="list-unstyled mb-0">
                    {item.items.map((listItem, idx) => (
                      <li 
                        key={idx} 
                        className="d-flex align-items-start gap-2 mb-2"
                      >
                        <i 
                          className="fa-solid fa-check-circle mt-1"
                          style={{
                            color: 'var(--theme)',
                            fontSize: '12px',
                            flexShrink: 0
                          }}
                        ></i>
                        <span className="theme-clr4 fz-14 lh-base">
                          {listItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Stats Bar (Optional Enhancement) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="row g-4 mt-5"
        >
          <div className="col-12">
            <div 
              className="rounded-4 p-4 text-center"
              style={{
                background: 'linear-gradient(135deg, var(--theme) 0%, var(--theme3) 100%)',
                color: '#ffffff'
              }}
            >
              <div className="row align-items-center">
                <div className="col-md-4 mb-3 mb-md-0">
                  <h3 className="fw-bold mb-1" style={{ color: '#ffffff' }}>50+</h3>
                  <p className="mb-0 fz-14" style={{ color: 'rgba(255,255,255,0.9)' }}>Strategic MoUs Signed</p>
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                  <h3 className="fw-bold mb-1" style={{ color: '#ffffff' }}>25+</h3>
                  <p className="mb-0 fz-14" style={{ color: 'rgba(255,255,255,0.9)' }}>Consulting Projects</p>
                </div>
                <div className="col-md-4">
                  <h3 className="fw-bold mb-1" style={{ color: '#ffffff' }}>100+</h3>
                  <p className="mb-0 fz-14" style={{ color: 'rgba(255,255,255,0.9)' }}>Partner Matches</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default KeyAchievements
