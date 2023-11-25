import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity('emergency_contacts')
export default class EmergencyContacts {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length:128})
    name: string

    @Column({length:13})
    telephone: string

    @OneToOne(() => User, (user) => user.emergencyContact)
    @JoinColumn()
    user: User
}