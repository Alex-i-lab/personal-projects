import { sanityClient, urlFor, isSanityConfigured } from '../lib/sanity';

export interface SanityProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  images?: any[];
  category: string;
  material: string;
  color: string;
  fit: string;
  style: string;
  occasion: string;
  gender: string;
  seoTitle: string;
  tags: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  reviews?: Array<{ user: string; rating: number; text: string }>;
}

export const fetchProducts = async () => {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }

  const query = `*[_type == "product"] {
    _id,
    title,
    description,
    price,
    image,
    images,
    category,
    material,
    color,
    fit,
    style,
    occasion,
    gender,
    seoTitle,
    tags,
    sizes,
    rating,
    reviewCount,
    reviews
  }`;

  try {
    const sanityProducts: SanityProduct[] = await sanityClient.fetch(query);
    
    return sanityProducts.map(p => ({
      id: p._id,
      title: p.title,
      desc: p.description,
      price: `$${p.price.toFixed(2)}`,
      img: urlFor(p.image).url(),
      images: p.images ? p.images.map(img => urlFor(img).url()) : [urlFor(p.image).url()],
      category: p.category,
      material: p.material,
      color: p.color,
      fit: p.fit,
      style: p.style,
      occasion: p.occasion,
      gender: p.gender,
      seoTitle: p.seoTitle,
      tags: p.tags || [],
      sizes: p.sizes || [],
      rating: p.rating || 0,
      reviewCount: p.reviewCount || 0,
      reviews: p.reviews || []
    }));
  } catch (error: any) {
    if (isSanityConfigured) {
      console.error("Error fetching products from Sanity:", error);
      throw error;
    }
    return null;
  }
};
