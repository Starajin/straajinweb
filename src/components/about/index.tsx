import FooterOne from "../../layouts/footers/FooterOne"
import HeaderOne from "../../layouts/headers/HeaderOne"
import BreadCrumb from "../common/BreadCrumb"
import Contact from "../homes/home-one/Contact"
import Choose from "./Choose"
import Financial from "./Financial"
import Solution from "./Solution"
import Team from "./Team"
import AdvisoryBoard from "./AdvisoryBoard"

const About = () => {
  return (
    <>
      <HeaderOne />
      <BreadCrumb title="About Us" page="about" />
      <Financial />
      <Choose />
      <Solution />
      <Team />
      <AdvisoryBoard />
      <Contact />
      <FooterOne />
    </>
  )
}

export default About
