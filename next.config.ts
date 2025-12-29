import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixes AI dependency errors by keeping Genkit on the server side
  serverExternalPackages: [
    "genkit", 
    "@genkit-ai/googleai", 
    "@genkit-ai/ai", 
    "@genkit-ai/core", 
    "@genkit-ai/flow"
  ],
  
  // Allows the Sanctuary to display placeholder and Unsplash imagery
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },

  // Note: 'eslint' and 'typescript' ignore settings have been moved 
  // to the deployment pipeline or separate config files in Next.js 16.
};

export default nextConfig;