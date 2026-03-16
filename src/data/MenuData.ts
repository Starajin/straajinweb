
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

const menu_data: MenuItem[] = [
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

export default menu_data;
