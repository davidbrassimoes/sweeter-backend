import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    roomName: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.message, {
        cascade: true,
    })
    createdBy: User

    @ManyToMany(() => User, {
        cascade: true,
    })
    @JoinTable()
    userInRoom: User[]


}