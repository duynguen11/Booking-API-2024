/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // Thêm các mẫu URL từ xa mà bạn muốn chấp nhận cho hình ảnh
  },

  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "2024",
      pathname: "/uploads/**",
    },
  ],
};

module.exports = nextConfig;
