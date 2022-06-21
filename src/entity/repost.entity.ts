import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { Post } from "./post.entity"
import { User } from "./user.entity"

@Entity()
export class Repost {
    @PrimaryGeneratedColumn()
    id: number

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

}