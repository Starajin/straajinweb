import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useRef } from "react";

interface Client {
   name: string;
   logo: string;
}

const clients: Client[] = [
   { name: "GS Caltex", logo: "/assets/img/clients/gs-caltex.jpg" },
   { name: "Dongwoo Electric", logo: "/assets/img/clients/dongwoo-electric.jpg" },
   { name: "KOFICE", logo: "/assets/img/clients/kofice.png" },
   { name: "KOIMA", logo: "/assets/img/clients/koima.jpg" },
   { name: "Nami Island", logo: "/assets/img/clients/nami-island.png" },
   { name: "PCET", logo: "/assets/img/clients/pcet-trust.jpg" },
   { name: "PCU", logo: "/assets/img/clients/pcu.png" },
   { name: "Rossari Biotech", logo: "/assets/img/clients/rossari-biotech.png" },
   { name: "Sandu Pharmaceuticals", logo: "/assets/img/clients/sandu-pharmaceuticals.png" },
   { name: "GJFEZ", logo: "/assets/img/clients/gjfez.jpg" },
   { name: "R&F Chemical", logo: "/assets/img/clients/rf-chemical.png" },
   { name: "Miretech", logo: "/assets/img/clients/miretech.png" },
   { name: "Sekyung", logo: "/assets/img/clients/sekyung.png" },
   { name: "Ecowave", logo: "/assets/img/clients/ecowave.jpg" },
   { name: "The Plan G", logo: "/assets/img/clients/the-plan-g.jpeg" },
   { name: "Ambani Tiles", logo: "/assets/img/clients/ambani-tiles.png" },
   { name: "Lanbell Cosmetics", logo: "/assets/img/clients/lanbell-cosmetics.jpg" },
   { name: "Maison India", logo: "/assets/img/clients/maison-india.jpg" },
   { name: "E4com", logo: "/assets/img/clients/e4com.jpeg" },
   { name: "YW Mobile", logo: "/assets/img/clients/yw-mobile.png" },
   { name: "Cursus Bio", logo: "/assets/img/clients/cursus-bio.jpeg" },
   { name: "REM Magnetics", logo: "/assets/img/clients/rem-magnetics.png" },
   { name: "Buja Tape", logo: "/assets/img/clients/buja-tape.jpeg" },
   { name: "Softberry", logo: "/assets/img/clients/softberry.avif" },
];

const ClientsSection = () => {
   const { t } = useTranslation();
   const gridRef = useRef<HTMLDivElement>(null);
   const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

   const clearTimeouts = useCallback(() => {
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
   }, []);

   useEffect(() => {
      const grid = gridRef.current;
      if (!grid) return;

      const cells = grid.querySelectorAll<HTMLElement>('.cl-cell');

      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  const cell = entry.target as HTMLElement;
                  const delay = parseInt(cell.dataset.col || '0', 10) * 100;
                  const id = setTimeout(() => {
                     cell.classList.add('cl-cell--color');
                  }, delay);
                  timeoutIds.current.push(id);
                  observer.unobserve(entry.target);
               }
            });
         },
         { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
      );

      cells.forEach((cell) => observer.observe(cell));
      return () => {
         clearTimeouts();
         observer.disconnect();
      };
   }, [clearTimeouts]);

   // Group into rows of 6
   const rows: Client[][] = [];
   for (let i = 0; i < clients.length; i += 6) {
      rows.push(clients.slice(i, i + 6));
   }

   return (
      <section className="clients-dark-section pt-100 pb-100">
         <div className="container">
            {/* Header */}
            <div className="row mb-50">
               <div className="col-lg-8">
                  <div className="d-flex align-items-center gap-2 fw-600 mb-lg-3 mb-2"
                     style={{ color: 'var(--theme2)' }}>
                     <img src="/assets/img/icon/section-step1.png" alt="img" style={{ filter: 'brightness(0) invert(1)' }} />
                     {t('services.clients.tag')}
                  </div>
                  <h2 className="text-white fw-bold mb-3 wow fadeInUp" data-wow-delay=".2s">
                     {t('services.clients.title')}
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay=".3s"
                     style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '540px', lineHeight: 1.7 }}>
                     {t('services.clients.description')}
                  </p>
               </div>
            </div>

            {/* Client logo grid */}
            <div className="cl-grid" ref={gridRef}>
               {rows.map((row, rowIdx) => (
                  <div key={rowIdx} className="cl-row">
                     {row.map((client, colIdx) => (
                        <div key={colIdx} className="cl-cell" data-col={colIdx}>
                           <div className="cl-logo-box">
                              <img src={client.logo} alt={client.name} title={client.name} className="cl-logo" loading="lazy" />
                           </div>
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ClientsSection;
