const API_URL = import.meta.env.VITE_CMS_API_URL || '';

async function fetchAPI<T>(endpoint: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const response = await fetch(`${API_URL}/api${endpoint}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// ==================== Public API ====================

export const api = {
  getProjects: (params?: { category?: string }) => {
    const query = params?.category ? `?category=${params.category}` : '';
    return fetchAPI<any[]>(`/projects${query}`);
  },

  getProject: (slug: string) =>
    fetchAPI<any>(`/projects/slug/${slug}`),

  getBlogPosts: () =>
    fetchAPI<any[]>('/blog'),

  getBlogPost: (slug: string) =>
    fetchAPI<any>(`/blog/slug/${slug}`),

  getServices: () =>
    fetchAPI<any[]>('/services'),

  getService: (slug: string) =>
    fetchAPI<any>(`/services/slug/${slug}`),

  getTeam: () =>
    fetchAPI<any[]>('/team'),

  getAdvisory: () =>
    fetchAPI<any[]>('/content/advisory'),

  getPartners: () =>
    fetchAPI<any[]>('/content/partners'),

  getTimeline: () =>
    fetchAPI<any[]>('/content/timeline'),

  getStatistics: (page?: string) => {
    const query = page ? `?page=${page}` : '';
    return fetchAPI<any[]>(`/content/statistics${query}`);
  },

  getFAQ: (page?: string) => {
    const query = page ? `?page=${page}` : '';
    return fetchAPI<any[]>(`/settings/faq${query}`);
  },

  getPricing: () =>
    fetchAPI<any[]>('/settings/pricing'),

  getTestimonials: () =>
    fetchAPI<any[]>('/content/testimonials'),

  getPageContent: (page: string, section: string) =>
    fetchAPI<any[]>(`/content/pages?page=${page}&section=${section}`),

  getHeader: () =>
    fetchAPI<any>('/layout/header'),

  getFooter: () =>
    fetchAPI<any>('/layout/footer'),
};
