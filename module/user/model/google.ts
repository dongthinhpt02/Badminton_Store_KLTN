import { z } from "zod";

export const googleLoginSchema = z.object({
  credential: z.string(),
});

export type IGoogleLoginForm = z.infer<typeof googleLoginSchema>;
