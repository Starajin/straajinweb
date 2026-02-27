import HomeContactForm from "../../forms/HomeContactForm"

const Contact = () => {
   return (
      <section className="contact-section section-bg pt-100 pb-100">
         <div className="container">
            <div className="row g-0">
               <div className="col-lg-6">
                  <div className="contact-thumb1 w-100 h-100 img-custom-anim-right">
                     <img src="assets/img/contact/Contact.jpg" alt="img" className="rounded-4 w-100" loading="lazy" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <HomeContactForm />
               </div>
            </div>
         </div>
      </section>
   )
}

export default Contact
