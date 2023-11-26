import { NextFunction, Request, Response } from "express";
import User from "../entities/user.entity";
import { userRepository } from "../repositories";
import { AppError } from "../errors/errors";

export const verifyUniqueEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body

    const user: User | null = await userRepository.findOneBy({email})

    if(user){
        throw new AppError('Email already exists', 409)
    }

    return next()
}

export const verifyUniqueCpf = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { cpf } = req.body

    const user: User | null = await userRepository.findOneBy({cpf})

    if(user){
        throw new AppError('Cpf already exists', 409)
    }

    return next()
}


export const verifyUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params

    const user: User | null = await userRepository.findOneBy({id})

    if(!user){
        throw new AppError('User not found', 404)
    }

    res.locals = {...res.locals, user}

    return next()
}