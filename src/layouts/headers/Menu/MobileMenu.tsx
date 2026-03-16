/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import menu_data from "../../../data/MenuData";
import { api } from "../../../services/api";
import { useCmsData } from "../../../hooks/useCmsData";
import { useLang } from "../../../hooks/useLang";

const MobileMenu = () => {
   const { t } = useTranslation();
   const { pick } = useLang();

   const { data: cmsNav } = useCmsData(() => api.getNavigation(), [] as any[]);
   const useCms = cmsNav.length > 0;

   const navItems = useCms
      ? cmsNav.map((n: any) => ({
         id: n.id,
         title: pick(n, 'label'),
         link: n.url || '/',
      }))
      : menu_data.map((m) => ({
         id: m.id,
         title: getMenuTitle(m.title, t),
         link: m.link,
      }));

   return (
      <ul>
         {navItems.map((menu) => (
            <li key={menu.id}>
               <Link to={menu.link}>
                  {menu.title}
               </Link>
            </li>
         ))}
      </ul>
   );
};

function getMenuTitle(title: string, t: any): string {
   switch (title.toLowerCase()) {
      case 'home': return t('nav.home');
      case 'about us': return t('nav.about');
      case 'services': return t('nav.services');
      case 'projects': return t('nav.projects');
      case 'contact': return t('nav.contact');
      case 'blog': return t('nav.blog');
      default: return title;
   }
}

export default MobileMenu;
