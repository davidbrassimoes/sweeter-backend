import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Post } from "./post.entity"
import { Tag } from "./tag.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    bio: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => User)
    @JoinTable()
    followsUser: User[]

    @ManyToMany(() => Tag)
    @JoinTable()
    followsTag: Tag[]

    @ManyToMany(() => Post)
    @JoinTable()
    likes: Post[]

}