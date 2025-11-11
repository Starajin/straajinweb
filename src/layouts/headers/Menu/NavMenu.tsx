/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";
import menu_data, { getMenuData } from "../../../data/MenuData";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const NavMenu = () => {

    const [navClick, setNavClick] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState(menu_data); // Start with static data
    const { t } = useTranslation();

    // Load dynamic menu data from CMS
    useEffect(() => {
        const loadMenuData = async () => {
            try {
                const cmsMenuData = await getMenuData();
                setMenuItems(cmsMenuData);
            } catch (error) {
                console.error('Failed to load CMS menu data:', error);
                // Keep using static menu_data as fallback
            }
        };
        
        loadMenuData();
    }, []);

    // Translation key mapping for menu items
    const getMenuTranslationKey = (title: string): string => {
        const keyMap: { [key: string]: string } = {
            'Home': 'nav.home',
            'About us': 'nav.about', 
            'Services': 'nav.services',
            'Projects': 'nav.projects',
            'Contact': 'nav.contact',
            'Blog': 'nav.blog' // Add blog translation
        };
        return keyMap[title] || title;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navClick]);

    return (
        <ul>
            {menuItems.map((menu) => (
                menu.mega_menus ? (
                    <li key={menu.id} className="has-dropdown active menu-thumb">
                        <Link to={menu.link} onClick={() => setNavClick(!navClick)}>
                            {menu.title}
                        </Link>
                        <ul className="submenu has-homemenu">
                            <li>
                                <div className="homemenu-items">
                                    {menu.mega_menus.map((item) => (
                                        <div key={item.id} className="homemenu">
                                            <div className="homemenu-thumb">
                                                <img src={item.thumb} alt="img" />
                                                <div className="demo-button">
                                                    <Link to={item.link} onClick={() => setNavClick(!navClick)}
                                                        className="theme-btn style4 d-center">
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="homemenu-content text-center">
                                                <h4 className="homemenu-title">
                                                    <Link to={item.link} onClick={() => setNavClick(!navClick)}>Home Version 0{item.id}</Link>
                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    </li>
                ) : (

                    <li key={menu.id}>
                        <Link to={menu.link} onClick={() => setNavClick(!navClick)}>
                            {t(getMenuTranslationKey(menu.title))}
                        </Link>

                        {menu.has_dropdown && (
                            <>
                                {menu.sub_menus && (
                                    <ul className="submenu">
                                        {menu.sub_menus.map((sub_m, i) => (
                                            <li key={i}>
                                                <Link to={sub_m.link} onClick={() => setNavClick(!navClick)}>
                                                    {sub_m.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                    </li>
                )
            ))}
        </ul>
    );
};

export default NavMenu;
