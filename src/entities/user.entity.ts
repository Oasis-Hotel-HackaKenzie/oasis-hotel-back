import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Occupation from "./occupations.entity";
import Reserve from "./reservations.entity";
import EmergencyContacts from "./emergencyContact.entity";

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 128})
    name: string

    @Column({length: 11, unique: true})
    cpf: string

    @Column({length: 128})
    password: string

    @Column({length: 128, unique: true})
    email: string

    @Column({length: 13})
    telephone: string

    @Column({length: 50})
    nationality: string

    @Column({length: 100, default: null})
    room_key: string

    @Column({ type: "enum", enum: ["guest", "manager", "attendant"], default: "guest" })
    role: string;

    @CreateDateColumn({ type: 'date'})
    createdAt: string

    @UpdateDateColumn({ type: 'date'})
    updatedAt: string

    @OneToOne(() => EmergencyContacts, (emergency_contacts) => emergency_contacts.user)
    emergencyContact: EmergencyContacts

    @OneToMany(() => Occupation, (occupations) => occupations.user)
    occupations: Occupation[]

    @OneToMany(() => Reserve, (reserver) => reserver.user)
    reserves: Reserve[]
}