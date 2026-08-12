import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const toDateInput = (val: unknown) => {
  if (val instanceof Date) return Number.isNaN(val.valueOf()) ? undefined : val;
  if (typeof val === "string" && val.trim() !== "") return val.trim();
  return undefined;
};

const safeDateField = () => z.preprocess(toDateInput, z.coerce.date().optional());

// Filtra del array cualquier elemento cuya "fecha" no sea válida,
// en vez de dejar `undefined` sueltos que romperían el renderizado.
const fechaTallerItem = z.object({
  fecha: z.preprocess(toDateInput, z.coerce.date()),
});

const fechasTallerFiltrado = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;
  return val.filter((item) => fechaTallerItem.safeParse(item).success);
}, z.array(fechaTallerItem));

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: safeDateField(),
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
    date: safeDateField(),
    fechasTaller: fechasTallerFiltrado.optional(),
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
    fecha_limite_inscripcion: safeDateField(),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { blog, talleres };