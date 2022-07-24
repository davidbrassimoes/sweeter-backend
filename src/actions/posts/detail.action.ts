import { myDataSource } from "../../app-data-source";
import { Request, Response } from "express";
import { User } from "../../entity/user.entity";
import { sortLikes } from "../../services/feed/sort-feed";
import { Post } from "../../entity/post.entity";

const action = async (req: Request, res: Response) => {
    const myUser = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user.id })
        .leftJoin("user.likes", "likes")
        .addSelect("likes.id")
        .getOne()

    const post = await myDataSource
        .getRepository(Post)
        .createQueryBuilder("post")
        .select(["post.id", "post.content", "post.createdAt"])
        .leftJoin("post.user", "user")
        .addSelect(["user.id", "user.username", "user.avatarColor"])
        .where("post.id = :id", { id: req.params.id })
        .loadRelationCountAndMap("post.likes", "post.likes")
        .getOne()

    sortLikes([post], myUser)
    return res.send(post);
}

export default action;