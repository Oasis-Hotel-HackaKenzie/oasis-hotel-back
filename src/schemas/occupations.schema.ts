import { z } from "zod";
import { userSchema } from "./users.schema";
import { roomsSchema } from "./rooms.schema";

export const occupationSchema = z.object({
    id: z.string(),
    check_in:z.date(),
    check_out:z.date(),
    user: userSchema,
    room:roomsSchema,
})

export const occupationReturnListSchema = occupationSchema.array()
export const updateOccupationSchema = occupationSchema.partial()


