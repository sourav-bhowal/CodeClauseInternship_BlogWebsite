/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    env: {
        API_URL: "http://localhost:8000",
    }

};

export default nextConfig;
