import { Link, useLocation } from "react-router-dom";
import menu_data from "../../../data/MenuData";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../../services/api";
import { useCmsData } from "../../../hooks/useCmsData";
import { useLang } from "../../../hooks/useLang";

const NavMenu = () => {

    const [navClick, setNavClick] = useState<boolean>(false);
    const { t } = useTranslation();
    const { pick } = useLang();
    const location = useLocation();

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
            title: t(getMenuTranslationKey(m.title)),
            link: m.link,
        }));

    const isActive = (link: string) => {
        if (link === '/') return location.pathname === '/';
        return location.pathname.startsWith(link);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navClick]);

    return (
        <ul>
            {navItems.map((menu) => (
                <li key={menu.id}>
                    <Link
                        to={menu.link}
                        onClick={() => setNavClick(!navClick)}
                        aria-current={isActive(menu.link) ? 'page' : undefined}
                    >
                        {menu.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

function getMenuTranslationKey(title: string): string {
    const keyMap: { [key: string]: string } = {
        'Home': 'nav.home',
        'About us': 'nav.about',
        'Services': 'nav.services',
        'Projects': 'nav.projects',
        'Contact': 'nav.contact',
        'Blog': 'nav.blog'
    };
    return keyMap[title] || title;
}

export default NavMenu;
