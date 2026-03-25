import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'vupa8rje';
const isConfigured = typeof projectId === 'string' && 
                   projectId.trim() !== '' && 
                   projectId !== 'your-project-id' &&
                   !projectId.includes('your-project-id');

export const sanityClient = isConfigured ? createClient({
  projectId: projectId as string,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Setting to false to use api.sanity.io instead of apicdn.sanity.io for better reliability
  apiVersion: '2023-05-03', // Using a stable, well-supported API version
}) : null;

export const isSanityConfigured = !!sanityClient;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder || !source) return { url: () => '' };
  return builder.image(source);
}
