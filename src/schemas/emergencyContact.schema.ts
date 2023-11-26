import { z } from "zod";

export const emergencyContactSchema = z.object({
    id: z.string(),
    name: z.string().max(128),
    telephone: z.string().max(13)
})