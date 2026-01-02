import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import BreadCrumb from "../../common/BreadCrumb"
import Choose from "./Choose"
import ServiceArea from "./Service"
import Solutions from "./Solutions"
import HowWeWork from "./HowWeWork"

const Service = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="Services" />
      <Solutions />
      <HowWeWork />
      <ServiceArea />
      <Choose />
      <FooterOne />
    </>
  )
}

export default Service
