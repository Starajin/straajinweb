import { useTranslation } from "react-i18next"

interface DataType {
   id: number;
   title: string;
   desc: string;
   number: string;
   email: string;
}

const ContactInfoTwo = () => {
   const { t } = useTranslation()

   const contact_data: DataType[] = [
      {
         id: 1,
         title: t('contact.offices.korea.title'),
         desc: t('contact.offices.korea.location'),
         number: "+82-2-1234-5678",
         email: "korea@starajin.com"
      },
      {
         id: 2,
         title: t('contact.offices.india.title'), 
         desc: t('contact.offices.india.location'),
         number: "+91-22-9876-5432",
         email: "india@starajin.com"
      }
   ]

   return (
      <section className="mail-adres-section section-bg pb-100">
         <div className="container">
            <div className="row g-xl-4 g-3 justify-content-center">
               {contact_data.map((item) => (
                  <div key={item.id} className="col-sm-6 col-lg-6 col-xl-6 wow fadeInUp" data-wow-delay=".1s">
                     <div className="mail-address-items">
                        <h5 className="theme-clr4 border-bottom pb-3 mb-3">{item.title}</h5>
                        <p className="theme-clr4 mb-40">{item.desc}</p>
                        <ul className="d-flex flex-column gap-1">
                           <li className="d-flex align-items-center gap-2 fw-bold theme-clr4">
                              <span className="w-32 h-32 rounded-circle d-center theme-bg">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                       d="M14 10.9467V13.3041C14 13.6541 13.7294 13.9445 13.3803 13.9691C13.0887 13.9897 12.8509 14 12.6667 14C6.7756 14 2 9.2244 2 3.33333C2 3.14914 2.0103 2.91125 2.0309 2.61967C2.05558 2.27059 2.34596 2 2.69591 2H5.0534C5.22452 2 5.36784 2.12961 5.38502 2.29987C5.40045 2.45271 5.41479 2.57543 5.42805 2.66801C5.5629 3.60981 5.83835 4.50624 6.23247 5.33535C6.29573 5.46843 6.25447 5.62773 6.13457 5.71337L4.6957 6.7412C5.57168 8.7874 7.2126 10.4283 9.2588 11.3043L10.2847 9.86793C10.3715 9.7466 10.5327 9.70487 10.6673 9.7688C11.4964 10.1626 12.3927 10.4377 13.3344 10.5723C13.4264 10.5855 13.5483 10.5997 13.7001 10.615C13.8704 10.6322 14 10.7755 14 10.9467Z"
                                       fill="#ffffff" />
                                 </svg>
                              </span>
                              {item.number}
                           </li>
                           <li className="d-flex align-items-center gap-2 fw-bold theme-clr4">
                              <span className="w-32 h-32 rounded-circle d-center theme-bg">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                       d="M1.49489 4.56945L7.65934 0.872286C7.87047 0.745653 8.13427 0.7457 8.34534 0.872406L14.5045 4.56944C14.6049 4.62969 14.6663 4.73817 14.6663 4.85524V13.3332C14.6663 13.7014 14.3679 13.9999 13.9997 13.9999H1.99967C1.63149 13.9999 1.33301 13.7014 1.33301 13.3332V4.85532C1.33301 4.73821 1.39446 4.62969 1.49489 4.56945ZM12.2301 5.49577L8.04007 9.12182L3.76449 5.49168L2.90153 6.50809L8.04841 10.878L13.1026 6.50399L12.2301 5.49577Z"
                                       fill="#ffffff" />
                                 </svg>
                              </span>
                              {item.email}
                           </li>
                        </ul>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default ContactInfoTwo
