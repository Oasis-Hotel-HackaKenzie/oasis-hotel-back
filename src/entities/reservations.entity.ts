import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Room from "./rooms.entity";

@Entity('reserves')
export default class Reserve {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date'})
    entry_date: string

    @Column({type: 'date'})
    exit_date: string
    
    @ManyToOne(() => User, (user) => user.reserves)
    user: User

    @ManyToOne(() => Room, (room) => room.reserves)
    room: Room
}