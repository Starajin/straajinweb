
interface DataType{
   id:number;
   thumb:string;
   sub_titleKey:string;
   titleKey:string;
   descKey:string;
   icon:string;
}

const financial_data:DataType[]=[
   {
      id: 1,
      thumb: "/assets/img/about/Our Mission.png",
      sub_titleKey: "about.financial.mission.label",
      titleKey: "about.financial.mission.title",
      descKey: "about.financial.mission.desc",
      icon: "/assets/img/icon/financial-icon1.png",
   },
   {
      id: 2,
      thumb: "/assets/img/about/Our Vision.png",
      sub_titleKey: "about.financial.vision.label",
      titleKey: "about.financial.vision.title",
      descKey: "about.financial.vision.desc",
      icon: "/assets/img/icon/financial-icon2.png",
   },
   {
      id: 3,
      thumb: "/assets/img/about/Our core Value.png",
      sub_titleKey: "about.financial.values.label",
      titleKey: "about.financial.values.title",
      descKey: "about.financial.values.desc",
      icon: "/assets/img/icon/financial-icon3.png",
   },
];

export default financial_data;