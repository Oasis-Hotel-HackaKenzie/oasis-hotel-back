import Room from "../entities/rooms.entity"
import User from "../entities/user.entity"
import { AppError } from "../errors/errors"
import { occupationRepository, roomRepository, userRepository } from "../repositories"

export const createRoomService = async (data: any): Promise<any> => {
    const room = await roomRepository.save(data)

    return room
}

export const readAllRoomsService = async (): Promise<any> => {
    const rooms = await roomRepository.find()

    return rooms
}

export const readRoomService = async (id: string): Promise<any> => {
    const room = await roomRepository.findOneBy({id})

    return room
}

export const createOccupationService = async (data: any): Promise<any> => {
    const { userId, roomId } = data

    const user: User | null = await userRepository.findOneBy({id: userId})
    if(!user){
        throw new AppError('User not found!', 404)
    }

    const room: Room | null = await roomRepository.findOneBy({id: roomId})
    if(!room){
        throw new AppError('Room not found!', 404)
    }

    const occupation = await occupationRepository.save({user, room})

    return occupation
}

export const readOccupationByCpfService = async (cpf: string): Promise<any> => {
    const user = await userRepository.findOne({ where: { cpf }})
    if(!user){
        throw new AppError('User not found!', 404)
    }

    const occupation = await occupationRepository.findOne({
        where: {
            user: { id: user.id },
            is_active: true
        },
        relations: ["user", "room"]
    })
    if(!occupation){
        throw new AppError('Occupation not found!', 404)
    }

    const checkInDate = new Date(occupation.check_in);
    const today = new Date();

    const timeDifference = today.getTime() - checkInDate.getTime();

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    const totalPrice = daysDifference * occupation.room.value;

    return {occupation, totalPrice}
}

export const deleteOccupationService = async (id: string): Promise<void> => {
    const occupation = await occupationRepository.findOneBy({id})
    if(!occupation){
        throw new AppError('Occupation not found!', 404)
    }
    
    occupation.is_active = false
    await occupationRepository.save(occupation)

    await occupationRepository.softRemove(occupation)
}

function parseISO(check_in: string) {
    throw new Error("Function not implemented.")
}


function differenceInDays(today: Date, checkInDate: any) {
    throw new Error("Function not implemented.")
}
