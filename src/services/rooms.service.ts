import { roomRepository } from "../repositories"

export const createRoomService = async (data: any): Promise<any> => {
    const room = await roomRepository.save(data)

    return room
}

export const readAllRoomsService = async (): Promise<any> => {
    const rooms = await roomRepository.find()

    return rooms
}

export const readRoomService = async(id: string): Promise<any> => {
    const room = await roomRepository.findOneBy({id})

    return room
}