import { z } from "zod";

export const upsertSchema = z.object({
  title: z.string(),
  slug: z.string().toLowerCase(),
  domain: z.string().optional(),
});
