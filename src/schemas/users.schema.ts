import { z } from "zod";
import { emergencyContactSchema } from "./emergencyContact.schema";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().max(128),
    cpf: z.string().max(11),
    password: z.string().max(128),
    email: z.string().email().max(128),
    telephone: z.string().max(13),
    nationality: z.string().max(50),
    room_key: z.string().max(100).nullable(),
    role: z.string().max(9),
    createdAt: z.string(),
    updatedAt: z.string(),
    emergencyContact: emergencyContactSchema
})

export const userReturnSchema = userSchema.omit({
    password: true
})
export const createUserSchema = userSchema.pick({
    name: true,
    email: true,
    password: true,
    admin: true
})

export const omitId = userSchema.pick({
    id: true,
    
  })
export const userReturnListSchema = userReturnSchema.array()
export const updateUserSchema = createUserSchema.partial()