/**
 * Utility to optimize Cloudinary URLs by adding auto-format, auto-quality, 
 * and optional width transformations.
 * 
 * @param url The original Cloudinary URL
 * @param options Optimization options (width, height, crop, quality, format)
 * @returns The optimized Cloudinary URL
 */
export function getOptimizedUrl(url: string, options: { width?: number; height?: number; quality?: string; format?: string } = {}) {
  if (!url || !url.includes('cloudinary.com')) return url;

  const { width, height, quality = 'auto', format = 'auto' } = options;
  
  // Base transformations
  let transforms = `f_${format},q_${quality}`;

  if (width) transforms += `,w_${width}`;
  if (height) transforms += `,h_${height},c_fill`;

  // Inject transformations after /upload/
  if (url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${transforms}/`);
  }

  return url;
}

/**
 * Common image sizes used in the app
 */
export const IMAGE_SIZES = {
  HERO: 1920,
  PRODUCT_CARD: 800,
  PRODUCT_DETAIL: 1200,
  THUMBNAIL: 400,
};
