import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import User from "./entities/user.entity";
import EmergencyContacts from "./entities/emergencyContact.entity";
import Room from "./entities/rooms.entity";

export const userRepository: Repository<User> = AppDataSource.getRepository(User)
export const emergencyContactRepository: Repository<EmergencyContacts> = AppDataSource.getRepository(EmergencyContacts)
export const roomRepository: Repository<Room> = AppDataSource.getRepository(Room)