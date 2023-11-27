import { emergencyContactRepository, userRepository } from "../repositories"
import { userReturnListSchema, userReturnSchema } from "../schemas/users.schema"

export const createUserService = async (data: any): Promise<any> => {
    const emergencyContact = await emergencyContactRepository.save(data.emergency_contact)
    const user = await userRepository.save({...data, emergencyContact})

    return userReturnSchema.parse(user)
}

export const readAllUsersService = async (): Promise<any> => {
    const users = await userRepository.find({ relations: ["emergencyContact"] });

    return userReturnListSchema.parse(users)
}

export const readUserService = async (id: string): Promise<any> => {
    const user = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.emergencyContact", "emergencyContact")
        .where("user.id = :id", { id })
        .getOne();

    return userReturnSchema.parse(user)
}