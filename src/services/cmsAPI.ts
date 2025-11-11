// CMS API service for frontend
interface CMSMenuItem {
    id: number;
    label: string;
    url: string;
    order: number;
    isActive: boolean;
}

interface CMSHeaderData {
    siteName: string;
    tagline: string;
    logoUrl: string;
    navigationMenu: CMSMenuItem[];
}

// For now, we'll simulate API calls with localStorage data
// Later this can be replaced with actual API calls to your CMS backend

export const cmsAPI = {
    // Get header data from CMS (simulated with localStorage for now)
    getHeaderData: async (): Promise<CMSHeaderData> => {
        try {
            // This would eventually be: fetch('http://localhost:5000/api/layout/header')
            
            // For now, check if CMS has saved data in localStorage, otherwise use defaults
            const cmsHeaderData = localStorage.getItem('cms_header_data');
            
            if (cmsHeaderData) {
                return JSON.parse(cmsHeaderData);
            }
            
            // Default data if no CMS data exists
            return {
                siteName: 'StaraJIN',
                tagline: 'Connecting India & Korea Through Innovation',
                logoUrl: '/assets/img/logo/Starajin - Header  3x svg.svg',
                navigationMenu: [
                    { id: 1, label: 'Home', url: '/', order: 1, isActive: true },
                    { id: 2, label: 'About us', url: '/about', order: 2, isActive: true },
                    { id: 3, label: 'Services', url: '/services', order: 3, isActive: true },
                    { id: 4, label: 'Projects', url: '/projects', order: 4, isActive: true },
                    { id: 5, label: 'Contact', url: '/contact', order: 5, isActive: true },
                ]
            };
        } catch (error) {
            console.error('Error fetching CMS header data:', error);
            // Return default data on error
            return {
                siteName: 'StaraJIN',
                tagline: 'Connecting India & Korea Through Innovation',
                logoUrl: '/assets/img/logo/Starajin - Header  3x svg.svg',
                navigationMenu: [
                    { id: 1, label: 'Home', url: '/', order: 1, isActive: true },
                    { id: 2, label: 'About us', url: '/about', order: 2, isActive: true },
                    { id: 3, label: 'Services', url: '/services', order: 3, isActive: true },
                    { id: 4, label: 'Projects', url: '/projects', order: 4, isActive: true },
                    { id: 5, label: 'Contact', url: '/contact', order: 5, isActive: true },
                ]
            };
        }
    }
};

export type { CMSMenuItem, CMSHeaderData };