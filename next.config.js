/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", 'unsplash.com'], // Thêm các mẫu URL từ xa mà bạn muốn chấp nhận cho hình ảnh
  },
};

module.exports = nextConfig;
