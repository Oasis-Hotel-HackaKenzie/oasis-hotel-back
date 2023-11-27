import { Router } from "express"
import { createOccupationController, createRoomController, deleteOccupationController, readAllRoomsController, readOccupationByCpfController, readRoomController } from "../controllers/rooms.controller"

export const roomRouter: Router = Router()

roomRouter.post("/", createRoomController)
roomRouter.get("/", readAllRoomsController)

roomRouter.get("/:room_id", readRoomController)

roomRouter.post("/occupation", createOccupationController)
roomRouter.get("/occupation/:cpf", readOccupationByCpfController)
roomRouter.delete("/occupation/:occupation_id", deleteOccupationController)