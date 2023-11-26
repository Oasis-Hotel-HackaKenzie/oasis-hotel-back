import { Router } from "express";
import { userRouter } from "./user.routes";
import { sessionRouter } from "./session.routes";
import { roomRouter } from "./room.routes";

export const routes: Router = Router()

routes.use('/users', userRouter)
routes.use('/login', sessionRouter)
routes.use('/rooms', roomRouter)