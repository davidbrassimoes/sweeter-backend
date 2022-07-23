import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToMany(() => User, (user) => user.followsTag)
    followers: User[]
}