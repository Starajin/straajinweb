
interface DataType{
   id:number;
   thumb:string;
   sub_title:string;
   title:string;
   desc:string;
   icon:string;
}

const financial_data:DataType[]=[
   {
      id: 1,
      thumb: "/assets/img/blog/financial-thumb1.png",
      sub_title: "Our Mission",
      title: "Driven by Purpose, Guided by Results",
      desc: "Beyond entering the market, we build excellence in India. Comprehensive market entry strategies tailored to Korean businesses. Cultural bridge-building through expert local insights. Sustainable business growth through strategic partnerships.",
      icon: "/assets/img/icon/financial-icon1.png",
   },
   {
      id: 2,
      thumb: "/assets/img/blog/financial-thumb2.png",
      sub_title: "Our Vision",
         title: "Supporting Sustainable Growth and Successful Market Entry for Korean Companies in India",
         desc: "Built on Trust, Backed by Experience. Leading Korea-India business facilitation platform by 2030. Creating lasting economic partnerships between two nations. Fostering innovation through cross-cultural collaboration.",
      icon: "/assets/img/icon/financial-icon2.png",
   },
   {
      id: 3,
      thumb: "/assets/img/blog/financial-thumb3.png",
      sub_title: "Our Core Values",
      title: "Bridging | Expertise | Innovation | Sustainability | Trust",
      desc: "The Principles That Guide Every Step We Take. At the heart of our consulting practice lies a clear set of values that shape every relationship, decision, and solution we deliver. These principles guide our commitment to excellence in Korea-India business facilitation. Integrity and transparency in all business dealings. Cultural sensitivity and respect for diversity. Excellence in service delivery and client satisfaction.",
      icon: "/assets/img/icon/financial-icon3.png",
   },
];

export default financial_data;