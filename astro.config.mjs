import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://Omochice.github.io",
  base: process.env.CI ? "/toy-slides" : "/",
  integrations: [tailwind()],
});
