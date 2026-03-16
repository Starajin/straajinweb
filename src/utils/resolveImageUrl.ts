const CMS_API = import.meta.env.VITE_CMS_API_URL || '';

/**
 * Resolves image URLs from CMS data:
 * - `/uploads/...` → prefixed with CMS backend URL
 * - `/assets/...`  → stays as-is (local public files)
 * - `http(s)://...` → stays as-is (external URLs)
 */
export const resolveImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads/')) return `${CMS_API}${url}`;
  return url;
};
