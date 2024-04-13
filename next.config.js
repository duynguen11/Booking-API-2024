/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*"], // Thêm các mẫu URL từ xa mà bạn muốn chấp nhận cho hình ảnh
  },
};

module.exports = nextConfig;
