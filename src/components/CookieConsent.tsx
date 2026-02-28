import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const COOKIE_CONSENT_KEY = "starajin_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
    // Disable GA if user declines
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "rgba(26, 26, 46, 0.97)",
        backdropFilter: "blur(8px)",
        borderTop: "2px solid #023EDA",
        padding: "16px 0",
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <p
            className="text-white mb-0"
            style={{ fontSize: "0.9rem", lineHeight: "1.5" }}
          >
            {t("cookie.message")}{" "}
            <Link
              to="/cookie-policy"
              style={{ color: "#4d8aff", textDecoration: "underline" }}
            >
              {t("cookie.learnMore")}
            </Link>
          </p>
          <div className="d-flex gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="btn btn-sm"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "6px 20px",
                borderRadius: "6px",
                fontSize: "0.85rem",
              }}
            >
              {t("cookie.decline")}
            </button>
            <button
              onClick={accept}
              className="btn btn-sm"
              style={{
                backgroundColor: "#023EDA",
                color: "#fff",
                fontWeight: 600,
                padding: "6px 20px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                border: "none",
              }}
            >
              {t("cookie.accept")}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
