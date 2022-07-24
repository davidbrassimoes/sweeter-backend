import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";
import { Post } from "../../entity/post.entity";
import { Repost } from "../../entity/repost.entity";
import { sortFeed, sortLikes } from "../../services/feed/sort-feed";

const action = async (req: Request, res: Response) => {
    const myUser = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user.id })
        .leftJoin("user.likes", "likes")
        .addSelect("likes.id")
        .leftJoin("user.likesRepost", "likesRepost")
        .addSelect("likesRepost.id")
        .getOne()

    const posts = await myDataSource
        .getRepository(Post)
        .createQueryBuilder("post")
        .select(["post.id", "post.content", "post.createdAt"])
        .leftJoin("post.user", "user")
        .addSelect(["user.id", "user.username", "user.avatarColor"])
        .leftJoin("post.tagged", "tagged")
        .addSelect("tagged.id")
        .where("tagged.id = :id", { id: req.params.id })
        .loadRelationCountAndMap("post.likes", "post.likes")
        .orderBy("post.createdAt", "DESC")
        .getMany()


    const reposts = await myDataSource
        .getRepository(Repost)
        .createQueryBuilder("repost")
        .select(["repost.id", "repost.content", "repost.createdAt"])
        .leftJoin("repost.post", "post")
        .addSelect(["post.id", "post.content", "post.user"])
        .leftJoin("repost.user", "user")
        .addSelect(["user.id", "user.username", "user.avatarColor"])
        .leftJoin("repost.tagged", "tagged")
        .addSelect("tagged.id")
        .where("tagged.id = :id", { id: req.params.id })
        .loadRelationCountAndMap("repost.likes", "repost.likes")
        .orderBy("repost.createdAt", "DESC")
        .getMany()


    const feed = [...posts, ...reposts]
    sortFeed(feed)
    sortLikes(feed, myUser)
    const data = { myUser, feed }

    return res.json(data)
}

export default action;