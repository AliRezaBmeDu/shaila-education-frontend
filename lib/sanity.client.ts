// /lib/sanity.client.ts

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// 1. Read the project ID and dataset from .env.local or Vercel
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = '2025-11-17'; // Use the date you started

// 2. Check that the variables exist
if (!projectId || !dataset) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET. Check your .env.local file.'
  );
}

// 3. Create the client for fetching data
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // IMPORTANT: Use the CDN in production for speed
});

// 4. Create a helper for building image URLs
const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: any) {
  return builder.image(source);
}