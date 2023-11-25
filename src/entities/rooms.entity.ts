import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Occupation from "./occupations.entity";
import Reserve from "./reservations.entity";

@Entity('rooms')
export default class Room {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 128})
    name: string

    @Column()
    capacity: number

    @Column({ type: "enum", enum: ["disponivel", "ocupado", "em limpeza"], default: "disponivel" })
    status: string;

    @Column()
    value: number

    @Column({ type: 'text'})
    description: string

    @Column({ type: 'text'})
    experience: string

    @OneToMany(() => Occupation, (occupations) => occupations.room)
    occupations: Occupation[]

    @OneToMany(() => Reserve, (reserver) => reserver.room)
    reserves: Reserve[]
}