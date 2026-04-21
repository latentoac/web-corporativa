import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
  }),
});

const talleres = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/talleres" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    modalidad: z.enum(['santiago', 'coruna', 'online']),
    inscription_url: z.string().url().optional(),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { blog, talleres };
