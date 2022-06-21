import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Tag } from "./tag.entity"
import { User } from "./user.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.post, {
        cascade: true,
    })
    user: User

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => Tag, {
        cascade: true,
    })
    @JoinTable()
    tagged: Tag[]

    @ManyToMany(() => User, {
        cascade: true,
    })
    @JoinTable()
    sweeted: User[]

}