/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL:
            process.env.DATABASE_URL ||
            'postgresql://postgres:G-3ec3G5aFb5BC1Bga6EE3e4d-6f1FBg@postgres.railway.internal:5432/railway',
    },
};

export default nextConfig;
