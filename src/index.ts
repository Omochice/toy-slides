import Mustache from "mustache";
import { readFileSync, writeFileSync } from "node:fs";
import { relative } from "node:path";
import { dirname, join } from "node:path";
import { globSync } from "glob";

const template = readFileSync(join(__dirname, "template.mustache")).toString();

const distDir = join(dirname(__dirname), "dist");

const slides = globSync(join(distDir, "**", "slide.html"))
  .sort()
  .reverse();

// NOTE: disable encodeURIComponent
Mustache.escape = (text) => text;
const output = Mustache.render(
  template,
  {
    slides: slides.map((e) => {
      const path = relative(distDir, e);
      return {
        path,
        title: dirname(path),
      };
    }),
  },
);

writeFileSync(join(distDir, "index.html"), output);
