/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.sportsdirect.com', 'images.unsplash.com', 'th.bing.com', '', 'cdn7.dissolve.com', 'cdn.iconscout.com', 'labhkari.s3.ap-south-1.amazonaws.com'],
    },
    env: {
        NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
        MONGO_URI: process.env.MONGO_URI,
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
        RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
        CLIENT_URL: process.env.CLIENT_URL,
        BUCKET_NAME: process.env.BUCKET_NAME,
        REGION: process.env.REGION,
        ACCESS_KEY: process.env.ACCESS_KEY,
        SECRET_KEY: process.env.SECRET_KEY,
        NEXT_PUBLIC_PHONE_NUM: process.env.NEXT_PUBLIC_PHONE_NUM,
        NEXT_PUBLIC_AUTH_TOKEN: process.env.NEXT_PUBLIC_AUTH_TOKEN,
        NEXT_PUBLIC_ACCOUNT_SID: process.env.NEXT_PUBLIC_ACCOUNT_SID,
        NEXT_PUBLIC_OTP_TEMPLATE_NAME: process.env.NEXT_PUBLIC_OTP_TEMPLATE_NAME,
        NEXT_PUBLIC_2FACTOR_API_KEY: process.env.NEXT_PUBLIC_2FACTOR_API_KEY,
        NEXT_PUBLIC_AUTH_KEY: process.env.NEXT_PUBLIC_AUTH_KEY,
        NEXT_PUBLIC_TEMPLATE_ID: process.env.NEXT_PUBLIC_TEMPLATE_ID,
        NEXT_PUBLIC_TEMPLATE_IDS: process.env.NEXT_PUBLIC_TEMPLATE_IDS
    },
};

export default nextConfig;
