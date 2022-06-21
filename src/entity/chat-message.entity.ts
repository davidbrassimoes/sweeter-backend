import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { Room } from "./chat-room.entity"
import { User } from "./user.entity"

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user) => user.message, {
        cascade: true,
    })
    createdBy: User

    @ManyToOne(() => Room, (room) => room.message, {
        cascade: true,
    })
    room: Room
}