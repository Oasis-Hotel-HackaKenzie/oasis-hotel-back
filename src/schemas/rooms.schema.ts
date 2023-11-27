import { z } from "zod";

export const roomsSchema = z.object({
    id: z.string(),
    name: z.string().max(128),
    capacity: z.number().max(13),
    status:z.string(),
    value:z.number(),
    description:z.string(),
    experience:z.string(),
    occupations:z.string(),
    reserves:z.string(),
})