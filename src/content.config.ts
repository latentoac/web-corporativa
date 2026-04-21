import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: image().optional(),
    tags: z.array(z.string()).optional(),
    publicado: z.boolean().default(true),
  }),
});

const talleres = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/talleres" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    dirigido_a: z.string().optional(),
    date: z.coerce.date(),
    hora_inicio: z.string().optional(),
    hora_fin: z.string().optional(),
    precio: z.number().optional(),
    image: image().optional(),
    modalidad: z.enum(['santiago', 'coruna', 'online']),
    inscription_url: z.string().url().optional(),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { blog, talleres };