import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

import image from "@astrojs/image";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
  site: "https://gee-astro-personal.vercel.app/",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
      cacheDir: "./.cache/image",
      logLevel: "debug",
    }),
  ],
  stylesheets: {
    scssOptions: {
      includePaths: ["./node_modules"],
    },
  },
});
