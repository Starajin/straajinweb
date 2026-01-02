import { Link } from "react-router-dom"
import Count from "../../common/Count"

const About = () => {
   return (
      <section className="about-section section-bg pt-100 pb-100 fix">
         <div className="container">
            <div className="row g-4 justify-content-between align-items-end">
               <div className="col-lg-5">
                  <div className="about-thumb2 position-relative">
                     <div className="about-image wow img-custom-anim-right w-100" data-wow-duration="1.3s"
                        data-wow-delay="0.3s">
                        <img src="/assets/img/about/about-thumb2.png" alt="img" className="w-100" />
                     </div>
                     <img src="/assets/img/about/signature.png" alt="img"
                        className="position-absolute bottom-0 start-0 m-md-4 m-3" />
                  </div>
               </div>
               
               <div className="col-lg-6">
                  <div className="about-content">
                     <div className="d-flex flex-sm-nowrap flex-wrap gap-2 justify-content-between mb-md-5 mb-4">
                        <div className="boxes">
                           <div className="section-title">
                              <span
                                 className="text-uppercase theme-clr4 theme4-border rounded-5 fw-600 d-inline-block py-0 mb-3 px-3">About
                                 us</span>
                              <h2 className="theme-clr4 fw-bold wow fadeInUp" data-wow-delay=".3s">
                                 Empowering you to
                                 <span className="fw-300">achieve a life you love</span>
                              </h2>
                           </div>
                        </div>
                        <div className="counter-area">
                           <div className="d-flex flex-column gap-md-4 gap-3">
                              <div className="wow fadeInUp" data-wow-delay=".3s">
                                 <h2 className="fw-300 border-bottom pb-2 mb-md-3 mb-1"><span
                                    className="count fw-300"><Count number={10} /></span>+</h2>
                                 <p>
                                    01. Years of Experience
                                 </p>
                              </div>
                              <div className="wow fadeInUp" data-wow-delay=".3s">
                                 <h2 className="fw-300 border-bottom pb-2 mb-md-3 mb-1"><span
                                    className="count fw-300"><Count number={240} /></span>+</h2>
                                 <p>
                                    02. Successful projects
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="d-flex flex-sm-nowrap flex-wrap gap-2 justify-content-between align-items-end">
                        <div className="boxes">
                           <p className="mb-2 wow fadeInUp" data-wow-delay=".3s">
                              Hi, I’m Michel jhon, and I'm passionate about helping people break free from
                              self-doubt
                              and step into the life they
                              were
                              meant to live
                           </p>
                           <p className="mb-lg-5 mb-3">
                              Let’s create the life you’ve been dreaming
                           </p>
                           <Link to="/about" className="theme-btn style3 pe-20 wow fadeIn" data-wow-delay=".4s">
                              <i
                                 className="fa-solid fa-arrow-right w-36 h-36 bg-white rounded-circle d-center fz-14 theme-clr4"></i>
                              Starting Now
                           </Link>
                        </div>
                        <div className="counter-area">
                           <div className="d-flex satisfied mb-3">
                              <img src="/assets/img/about/satisfied-member1.png" alt="img" className="rounded-circle" />
                              <img src="/assets/img/about/satisfied-member2.png" alt="img" className="rounded-circle" />
                              <img src="/assets/img/about/satisfied-member3.png" alt="img" className="rounded-circle" />
                           </div>
                           <div>
                              <h5 className="mb-1">Join 5,000+</h5>
                              <p>satisfied members</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
