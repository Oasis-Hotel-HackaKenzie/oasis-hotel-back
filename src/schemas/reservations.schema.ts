import { z } from "zod";
import { userSchema } from "./users.schema";
import { roomsSchema } from "./rooms.schema";

export const reservationsSchema = z.object({
    id: z.string(),
    entry_date: z.date(),
    exit_date: z.date(),
    user:userSchema,
    room:roomsSchema,
})
export const reservationRequestSchema = reservationsSchema.omit({id:true})
export const reservationsReturnListSchema = reservationsSchema.array()
export const updateReservationSchema = reservationsSchema.partial()