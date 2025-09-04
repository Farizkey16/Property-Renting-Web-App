import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "picsum.photos",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
