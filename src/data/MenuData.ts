
import { cmsAPI, type CMSMenuItem } from '../services/cmsAPI';

interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    mega_menus?: {
        id: number;
        thumb: string;
        link: string;
        title: string;
    }[];
    sub_menus?: {
        link: string;
        title: string;
    }[];
}

// Convert CMS menu item to frontend menu item format
const convertCMSToMenuItem = (cmsItem: CMSMenuItem): MenuItem => {
    return {
        id: cmsItem.id,
        title: cmsItem.label,
        link: cmsItem.url,
        has_dropdown: false
    };
};

// Function to get menu data (either from CMS or fallback to static)
export const getMenuData = async (): Promise<MenuItem[]> => {
    try {
        const cmsData = await cmsAPI.getHeaderData();
        
        // Filter only active menu items and sort by order
        const activeMenuItems = cmsData.navigationMenu
            .filter(item => item.isActive)
            .sort((a, b) => a.order - b.order);
        
        return activeMenuItems.map(convertCMSToMenuItem);
    } catch (error) {
        console.error('Error loading CMS menu data, using fallback:', error);
        return getStaticMenuData();
    }
};

// Static fallback menu data
const getStaticMenuData = (): MenuItem[] => [
    {
        id: 1,
        has_dropdown: false,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        has_dropdown: false,
        title: "About us",
        link: "/about",
    },
    {
        id: 3,
        has_dropdown: false,
        title: "Services",
        link: "/services",
    },
    {
        id: 4,
        has_dropdown: false,
        title: "Projects",
        link: "/projects",
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
];

// Default export for backward compatibility
const menu_data: MenuItem[] = getStaticMenuData();

export default menu_data;