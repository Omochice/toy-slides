import { getCollection, z } from "astro:content";
import { parse } from "node-html-parser";

import { marp } from "./marp";

/**
 * Get all slides ordered by date
 *
 * @returns Slides
 */
export async function getSlides() {
  return (await getCollection("slides", (s) => s.data.marp && !s.data.draft))
    .map((s) => {
      const { html, css, comments } = marp.render(s.body);
      const doc = parse(html);
      const id = getDate(s.slug);
      const title =
        doc.querySelector("h1")?.innerText.replace(/\r?\n/g, "") ?? id;
      return {
        params: { id },
        props: { ...s, css, html, comments, title },
      };
    })
    .sort((a, b) => compareDates(getDate(a.props.slug), getDate(b.props.slug)));
}

/**
 * Get a slide by slug
 *
 * @param slug The slug
 * @returns The date of the slide
 */
function getDate(slug: string): string {
  const mayDate = slug.split("/")[0];
  return z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .parse(mayDate);
}

/**
 * Compare two date strings
 *
 * @param a The left handside date
 * @param b The right handside date
 * @returns The comparison result
 */
function compareDates(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime();
}
