import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },

  images: {
    remotePatterns: [
      // Supabase - Animales
      {
        protocol: "https",
        hostname: "jnhwhgoxymqxpplkyenf.supabase.co",
        pathname: "/storage/v1/object/public/animals/**",
      },

      // Supabase - Posts
      {
        protocol: "https",
        hostname: "jnhwhgoxymqxpplkyenf.supabase.co",
        pathname: "/storage/v1/object/public/posts/**",
      },

      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
