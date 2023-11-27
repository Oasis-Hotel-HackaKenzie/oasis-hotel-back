import { Router } from "express"
import { createRoomController, readAllRoomsController, readRoomController } from "../controllers/rooms.controller"

export const roomRouter: Router = Router()

roomRouter.post("/", createRoomController)
roomRouter.get("/", readAllRoomsController)

roomRouter.get("/:id", readRoomController)