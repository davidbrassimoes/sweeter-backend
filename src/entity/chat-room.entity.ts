import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roomName: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => User, {
        cascade: true,
    })
    @JoinTable()
    userInRoom: User[]


}