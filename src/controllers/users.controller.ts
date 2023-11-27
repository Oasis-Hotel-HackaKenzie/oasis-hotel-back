import { Request, Response } from "express";
import { createUserService, readAllUsersService, readUserService } from "../services/users.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await createUserService(req.body)

    return res.status(201).json(user)
}

export const readAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    const users = await readAllUsersService()

    return res.status(200).json(users)
}

export const readUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await readUserService(req.params.id)
    
    return res.status(200).json(user)
}