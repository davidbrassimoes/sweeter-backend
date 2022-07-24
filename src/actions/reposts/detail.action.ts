import { myDataSource } from "../../app-data-source";
import { Request, Response } from "express";
import { User } from "../../entity/user.entity";
import { sortLikes } from "../../services/feed/sort-feed";
import { Repost } from "../../entity/repost.entity";

const action = async (req: Request, res: Response) => {
    const myUser = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user.id })
        .leftJoin("user.likesRepost", "likesRepost")
        .addSelect("likesRepost.id")
        .getOne()

    const repost = await myDataSource
        .getRepository(Repost)
        .createQueryBuilder("repost")
        .select(["repost.id", "repost.content", "repost.createdAt"])
        .leftJoin("repost.post", "post")
        .addSelect(["post.id", "post.content", "post.user"])
        .leftJoin("repost.user", "user")
        .addSelect(["user.id", "user.username", "user.avatarColor"])
        .leftJoin("post.sweeted", "sweeted")
        .addSelect("sweeted.id")
        .where("repost.id = :id", { id: req.params.id })
        .loadRelationCountAndMap("repost.likes", "repost.likes")
        .getOne()

    sortLikes([repost], myUser)
    return res.send(repost);
}

export default action;