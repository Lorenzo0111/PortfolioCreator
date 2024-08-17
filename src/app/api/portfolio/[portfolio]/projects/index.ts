import { z } from "zod";

export const upsertSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
  slug: z.string().toLowerCase(),
});
