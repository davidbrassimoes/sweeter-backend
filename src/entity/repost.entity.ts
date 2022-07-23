import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, Column } from "typeorm"
import { Post } from "./post.entity"
import { Tag } from "./tag.entity"
import { User } from "./user.entity"

@Entity()
export class Repost {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.repost, {
        cascade: true,
    })
    user: User

    @ManyToOne(() => Post, (post) => post.repost, {
        cascade: true,
    })
    post: Post

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

    @ManyToMany(() => User, (user) => user.likesRepost)
    likes: User[]
}