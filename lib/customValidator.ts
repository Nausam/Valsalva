import * as z from "zod";

export const customFormSchema = z.object({
  imageUrl: z.string(),
});
