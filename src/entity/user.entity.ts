import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Post } from "./post.entity"
import { Repost } from "./repost.entity"
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

    @ManyToMany(() => User, {
        cascade: true,
    })
    @JoinTable()
    followsUser: User[]

    @ManyToMany(() => Tag, {
        cascade: true,
    })
    @JoinTable()
    followsTag: Tag[]

    @ManyToMany(() => Post, {
        cascade: true,
    })
    @JoinTable()
    likes: Post[]

    @ManyToMany(() => Repost, {
        cascade: true,
    })
    @JoinTable()
    likesRepost: Repost[]

}