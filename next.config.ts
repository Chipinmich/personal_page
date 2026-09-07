import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cover art is authored as local SVG so it stays crisp and tiny. These
    // files are committed to /public, never uploaded or fetched from users.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // The MDX toolchain runs only on the server during the build; keeping it out
  // of the bundler avoids re-bundling Shiki grammars on every change.
  serverExternalPackages: ["@mdx-js/mdx", "shiki"],

  // Placeholder content should not silently ship a broken page.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
