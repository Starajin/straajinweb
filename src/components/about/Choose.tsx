import { JSX } from "react";
import { Link } from "react-router-dom";

interface DataType {
   id: number;
   icon: string;
   title: JSX.Element;
   desc: string;
}

const choose_data: DataType[] = [
   {
      id: 1,
      icon: "/assets/img/icon/choose-icon1.png",
      title: (<>15+ <br /> years in India</>),
      desc: "15 years of experience in India with experts & Knowhows",
   },
   {
      id: 2,
      icon: "/assets/img/icon/choose-icon2.png",
      title: (<>1000+ <br /> Network</>),
      desc: "Built an intimate network across Korean-Indian government, companies, and institutions",
   },
   {
      id: 3,
      icon: "/assets/img/icon/choose-icon3.png",
      title: (<>50+ <br /> Success Case</>),
      desc: "Many success stories with data-driven, customized strategies",
   },
   {
      id: 4,
      icon: "/assets/img/icon/choose-icon4.png",
      title: (<>100% <br /> Total Support</>),
      desc: "Comprehensive support from market entry to growth",
   },
];

const Choose = () => {
   return (
      <section className="choose4-section pt-100 pb-100">
         <div className="container">
            <div className="row g-lg-4 g-md-3 g-2 align-items-end mb-40">
               <div className="col-lg-7 col-md-7">
                  <div className="section-header">
                     <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-lg-3 m-2">
                        <img src="/assets/img/icon/section-step1.png" alt="img" /> Why Choose Us
                     </div>
                     <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                        Your Trusted Partner for
                        <span className="fw-300">Korea-India Business Success</span>
                     </h2>
                  </div>
               </div>
               <div className="col-lg-5 col-md-5">
                  <div className="wow fadeInUp" data-wow-delay=".4s">
                     <p className="theme-clr4">
                        With 15+ years of experience and a network of 1000+ connections, we deliver proven results 
                        through 50+ successful cases and provide comprehensive support for your Korea-India business expansion journey.
                     </p>
                  </div>
               </div>
            </div>
            <div className="row g-xxl-4 g-xl-3 g-2">
               {choose_data.map((item) => (
                  <div key={item.id} className="col-sm-6 col-lg-3">
                     <div className="choose-items4 wow fadeInDown" data-wow-delay=".2s">
                        <div className="boxes">
                           <img src={item.icon} alt="img" className="mb-lg-5 mb-4" />
                           <h5 className="border-bottom pb-3 mb-4">
                              <Link to="/about" className="text-uppercase fw-600 theme-clr4">
                                 {item.title}
                              </Link>
                           </h5>
                           <p className="theme-clr4">{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Choose
