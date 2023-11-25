import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";
import Room from "./rooms.entity";

@Entity('occupations')
export default class Occupation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'date'})
    check_in: string

    @DeleteDateColumn({ type: 'date', nullable: true})
    check_out: string | null

    @Column({default: true})
    is_active: boolean

    @ManyToOne(() => User, (user) => user.occupations)
    user: User

    @ManyToOne(() => Room, (room) => room.occupations)
    room: Room
}