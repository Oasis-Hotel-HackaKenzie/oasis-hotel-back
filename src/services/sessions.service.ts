import { compare } from "bcryptjs"
import User from "../entities/user.entity"
import { AppError } from "../errors/errors"
import { userRepository } from "../repositories"
import { sign } from "jsonwebtoken"
import "dotenv/config"

export const loginService = async (data: any): Promise<any> => {
    const { email } = data

    const user: User | null = await userRepository.findOneBy({email})
    
    if(!user){
        throw new AppError('Invalid credentials', 401)
    }

    // const checkPassword = await compare(data.password, user.password)

    // if(!checkPassword){
    //     throw new AppError('Invalid credentials', 401)
    // }

    if(data.password !== user.password){
        throw new AppError('Invalid credentials1', 401)
    }

    const token: string = sign(
        {email: user.email,
        role: user.role},
        process.env.SECRET_KEY!,
        {subject: user.id,
        expiresIn: '24h'}
    )

    const role = user.role
    
    return { token, role }
}