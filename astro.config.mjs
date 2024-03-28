import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://Omochice.github.io",
  base: process.env.CI ? "/toy-slides" : "/",
});
