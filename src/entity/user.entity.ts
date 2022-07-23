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

    @Column({ select: false })
    password: string

    @Column()
    email: string

    @Column()
    bio: string

    @Column()
    avatarColor: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToMany(() => User, (user) => user.followers)
    @JoinTable()
    followsUser: User[]

    @ManyToMany(() => User, (user) => user.followsUser)
    followers: User[]

    @ManyToMany(() => Tag, (tag) => tag.followers)
    @JoinTable()
    followsTag: Tag[]

    @ManyToMany(() => Post, (post) => post.likes)
    @JoinTable()
    likes: Post[]

    @ManyToMany(() => Repost, (repost) => repost.likes)
    @JoinTable()
    likesRepost: Repost[]

}