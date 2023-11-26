import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ZodTypeAny } from "zod";
import "dotenv/config";
import { AppError } from "../errors/errors";

export const verifyBody = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body)

    return next()
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers

    if(!authorization){
        throw new AppError('Missing bearer token', 401)
    } 
        

    const token: string = authorization.split(' ')[1]
    const decoded = verify(token, process.env.SECRET_KEY!)
    res.locals = {...res.locals, decoded}

    return next()
}

export const verifyManager = (req: Request, res: Response, next: NextFunction): void => {
    const { role } = res.locals.decoded

    if(role !== "manager"){
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}

export const verifyAttendant = (req: Request, res: Response, next: NextFunction): void => {
    const { role } = res.locals.decoded

    if(role !== "attendant" && role !== "manager"){
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}

export const verifyPermissions = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params
    const { sub, role } = res.locals.decoded

    if(role == "manager"){
        return next()
    }

    if(id !== sub){
        throw new AppError('Insufficient permission', 403)
    }

    return next()
}