import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),

  papers: defineCollection({
    type: 'content',
    schema: baseSchema.extend({
      authors: z.string(),
      venue: z.string().optional(),
      paperUrl: z.string().url().optional(),
      codeUrl: z.string().url().optional(),
    }),
  }),

  projects: defineCollection({
    type: 'content',
    schema: baseSchema.extend({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      status: z.enum(['active', 'archived', 'wip']).default('active'),
      featured: z.boolean().default(false),
    }),
  }),

  lab: defineCollection({
    type: 'content',
    schema: baseSchema,
  }),

  blog: defineCollection({
    type: 'content',
    schema: baseSchema,
  }),
};
