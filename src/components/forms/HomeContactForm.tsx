import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface FormData {
   user_name: string;
   company: string;
   user_email: string;
   service_interest: string;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      company: yup.string().required().label("Company"),
      user_email: yup.string().required().email().label("Email"),
      service_interest: yup.string().required().label("Service Interest"),
      message: yup.string().required().label("Message"),
   })
   .required();

const HomeContactForm = () => {

   const { t } = useTranslation();
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = () => {
      if (form.current) {
         emailjs.sendForm('service_6y6yqwk', 'template_l7vv1mg',
            form.current, '0Nl20_gGiZ8xlkEt9')
            .then((result) => {
               const notify = () => toast('Message sent successfully', { position: 'top-center' });
               notify();
               reset();
               console.log(result.text);
            }, (error) => {
               console.log(error.text);
            });
      } else {
         console.error("Form reference is null");
      }
   };

   return (
      <div className="contact-content1">
         <div className="section-header mb-xxl-4 mb-4">
            <div className="d-flex align-items-center gap-2 theme-clr fw-600 mb-2">
               <img src="assets/img/icon/section-step1.png" alt="img" /> {t('contact.quickConsultation')}
            </div>
            <h2 className="theme-clr4 fw-bold mb-xxl-3 mb-xl-2 mb-2 wow fadeInUp">{t('contact.getExpertAdvice')}
               <span className="fw-300"> {t('contact.in24Hours')}</span>
            </h2>
         </div>
         <form ref={form} onSubmit={handleSubmit(sendEmail)}>
            <div className="row g-4">
               <div className="col-md-6">
                  <div className="form__grp">
                     <input className="form-control w-100" {...register("user_name")} type="text" placeholder={t('contact.yourName')} />
                     <p className="form_error">{errors.user_name?.message}</p>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form__grp">
                     <input className="form-control w-100" {...register("company")} type="text" placeholder={t('contact.company')} />
                     <p className="form_error">{errors.company?.message}</p>
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form__grp">
                     <input className="form-control w-100" {...register("user_email")} type="email" placeholder={t('contact.emailAddress')} />
                     <p className="form_error">{errors.user_email?.message}</p>
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form__grp">
                     <select className="form-control w-100" {...register("service_interest")}>
                        <option value="">{t('contact.selectServiceInterest')}</option>
                        <option value="business-consulting">{t('contact.businessConsulting')}</option>
                        <option value="market-entry">{t('contact.marketEntry')}</option>
                        <option value="partnership-development">{t('contact.partnershipDevelopment')}</option>
                        <option value="cultural-exchange">{t('contact.culturalExchange')}</option>
                        <option value="strategic-planning">{t('contact.strategicPlanning')}</option>
                        <option value="other">{t('contact.other')}</option>
                     </select>
                     <p className="form_error">{errors.service_interest?.message}</p>
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form__grp">
                     <textarea className="form-control w-100" {...register("message")} placeholder={t('contact.tellUsAboutGoals')} rows={4}></textarea>
                     <p className="form_error">{errors.message?.message}</p>
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="form__grp wow fadeInUp" data-wow-delay=".3s">
                     <button 
                        type="submit" 
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-3 px-4 border-0 rounded-pill fw-bold text-white btn-theme-contact"
                        style={{
                           backgroundColor: 'var(--theme)',
                           fontSize: '16px',
                           lineHeight: '1.5',
                           transition: 'all 0.3s ease',
                           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}
                     >
                        <i className="fa-solid fa-calendar-check"></i>
                        {t('contact.requestConsultation')}
                     </button>
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                     <i className="fa-solid fa-lock text-warning"></i>
                     <small className="text-muted">{t('contact.informationSecure')}</small>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}

export default HomeContactForm
