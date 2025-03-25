/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["drive.usercontent.google.com"]
    },
    experimental:{
        serverActions:true
    }
};

export default nextConfig;
