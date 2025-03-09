/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static HTML export
    basePath: "Animation", // Replace with your GitHub repository name
    images: {
      unoptimized: true, // Required for GitHub Pages
    },
  };
  
  module.exports = nextConfig;
  
