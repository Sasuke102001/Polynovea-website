import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com",
              "style-src 'self' 'unsafe-inline' https://rsms.me",
              "font-src 'self' https://rsms.me",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com",
              "connect-src 'self'",
              "media-src 'self' https://www.youtube.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
