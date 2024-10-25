/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/system/:path*",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, OPTIONS",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
