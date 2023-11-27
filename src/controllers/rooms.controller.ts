import { Request, Response } from "express";
import { createOccupationService, createRoomService, deleteOccupationService, readAllRoomsService, readOccupationByCpfService, readRoomService } from "../services/rooms.service";

export const createRoomController = async (req: Request, res: Response): Promise<Response> => {
    const room = await createRoomService(req.body)

    return res.status(201).json(room)
}

export const readAllRoomsController = async (req: Request, res: Response): Promise<Response> => {
    const rooms = await readAllRoomsService()
    
    return res.status(200).json(rooms)
}

export const readRoomController = async (req: Request, res: Response): Promise<Response> => {
    const room = await readRoomService(req.params.room_id)
    
    return res.status(200).json(room)
}

export const createOccupationController = async (req: Request, res: Response): Promise<Response> => {
    const occupation = await createOccupationService(req.body)

    return res.status(201).json(occupation)
}

export const readOccupationByCpfController = async (req: Request, res: Response): Promise<Response> => {
    const occupation = await readOccupationByCpfService(req.params.cpf)
    
    return res.status(200).json(occupation)
}

export const deleteOccupationController = async (req: Request, res: Response): Promise<Response> => {
    await deleteOccupationService(req.params.occupation_id)
    
    return res.status(204).json()
}