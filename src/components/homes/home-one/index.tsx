import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import Banner from "./Banner"
import Blog from "./Blog"
import Choose from "./Choose"
import Integration from "./Integration"
import Contact from "./Contact"

import KeyAchievements from "./KeyAchievements"
import Partners from "./Partners"
import Service from "./Service"

const HomeOne = () => {
   return (
      <>
         <HeaderOne />
         <Banner />
         <Choose />
         <Integration />
         <Service />
         <KeyAchievements />
         <Partners />
         <Blog />
         <Contact />
         <FooterOne />
      </>
   )
}

export default HomeOne
