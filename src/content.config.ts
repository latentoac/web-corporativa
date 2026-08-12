import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const safeDateString = (val: unknown) => {
  if (typeof val === "string" && val.trim() !== "" && val !== "Invalid date") {
    return val;
  }
  return undefined;
};

const safeDate = () => z.preprocess(safeDateString, z.coerce.date().optional());

const safeRequiredDate = () =>
  z.preprocess(safeDateString, z.coerce.date({
    error: "Fecha inválida o vacía en fechasTaller",
  }));

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: safeDate(),
    image: image().optional(),
    tags: z.array(z.string()).optional(),
    publicado: z.boolean().default(true),
  }),
});

const talleres = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/talleres" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    dirigido_a: z.string().optional(),
    date: safeDate(),
    fechasTaller: z.array(z.object({
      fecha: safeRequiredDate(),
    })).optional(),
    hora_inicio: z.string().optional(),
    hora_fin: z.string().optional(),
    precio: z.string().optional(),
    image: image().optional(),
    modalidad: z.preprocess(
      (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val === "string") return val.split(",").map((s) => s.trim());
        return [val];
      },
      z.array(z.enum(['santiago', 'coruna', 'online']))
    ),
    inscription_url: z.string().url().optional(),
    fecha_limite_inscripcion: safeDate(),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { blog, talleres };