import { Request, Response } from "express";
import { createRoomService, readAllRoomsService, readRoomService } from "../services/rooms.service";

export const createRoomController = async (req: Request, res: Response): Promise<Response> => {
    const room = await createRoomService(req.body)

    return res.status(201).json(room)
}

export const readAllRoomsController = async (req: Request, res: Response): Promise<Response> => {
    const rooms = await readAllRoomsService()
    
    return res.status(200).json(rooms)
}

export const readRoomController = async (req: Request, res: Response): Promise<Response> => {
    const room = await readRoomService(req.params.id)
    
    return res.status(200).json(room)
}