import FooterOne from "../../../layouts/footers/FooterOne"
import InnerHeader from "../../../layouts/headers/InnerHeader"
import BreadCrumb from "../../common/BreadCrumb"
import Contact from "../../homes/home-one/Contact"
import Faq from "../../homes/home-one/Faq"
import Testimonial from "../../homes/home-two/Testimonial"
import Choose from "./Choose"
import ServiceArea from "./ServiceArea"
import WhatdoStart from "./WhatdoStart"

const ServiceDetails = () => {
   return (
      <>
         <InnerHeader />
         <BreadCrumb title="Wealth Planning" />
         <WhatdoStart />
         <Choose />
         <ServiceArea />
         <Testimonial />
         <Faq />
         <Contact />
         <FooterOne />
      </>
   )
}

export default ServiceDetails
