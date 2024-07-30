/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["encrypted-tbn0.gstatic.com", "as1.ftcdn.net"],
    },
    env: {
        BASE_URL: process.env.BASE_URL,
        NEXT_URL: process.env.NEXT_URL,
        DYNAMIC_API_KEY: process.env.DYNAMIC_API_KEY,
    },
};
export default nextConfig;
