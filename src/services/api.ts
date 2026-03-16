const API_URL = import.meta.env.VITE_CMS_API_URL || '';

async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const response = await fetch(`${API_URL}/api/public${endpoint}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// ==================== Public API ====================

export const api = {
  // Page content (all sections for a page)
  getPageContent: (page: string) =>
    fetchAPI<any[]>(`/pages/${page}`),

  // Projects
  getProjects: (params?: { category?: string }) => {
    const query = params?.category ? `?category=${params.category}` : '';
    return fetchAPI<any[]>(`/projects${query}`);
  },

  // Blog
  getBlogPosts: () =>
    fetchAPI<any[]>('/blog'),

  getBlogPost: (slug: string) =>
    fetchAPI<any>(`/blog/slug/${slug}`),

  // Services
  getServices: () =>
    fetchAPI<any[]>('/services'),

  // Team
  getTeam: () =>
    fetchAPI<any[]>('/team'),

  // Advisory
  getAdvisory: () =>
    fetchAPI<any[]>('/advisory'),

  // Partners
  getPartners: (category?: string) => {
    const query = category ? `?category=${category}` : '';
    return fetchAPI<any[]>(`/partners${query}`);
  },

  // Timeline
  getTimeline: () =>
    fetchAPI<any[]>('/timeline'),

  // Statistics
  getStatistics: (page?: string) => {
    const query = page ? `?page=${page}` : '';
    return fetchAPI<any[]>(`/statistics${query}`);
  },

  // Testimonials
  getTestimonials: () =>
    fetchAPI<any[]>('/testimonials'),

  // Offices
  getOffices: () =>
    fetchAPI<any[]>('/offices'),

  // Navigation
  getNavigation: () =>
    fetchAPI<any[]>('/navigation'),

  // Site settings (returns key-value object)
  getSettings: () =>
    fetchAPI<Record<string, string>>('/settings'),
};
