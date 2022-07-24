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
        .leftJoin("user.followsTag", "followsTag")
        .addSelect("followsTag.id")
        .leftJoin("user.followsUser", "followsUser")
        .addSelect("followsUser.id")
        .leftJoin("user.likes", "likes")
        .addSelect("likes.id")
        .leftJoin("user.likesRepost", "likesRepost")
        .addSelect("likesRepost.id")
        .getOne()

    const myUserFollowsTag = myUser?.followsTag.map(x => x.id)
    const myUserFollowsUser = myUser?.followsUser.map(x => x.id)

    const posts = await myDataSource
        .getRepository(Post)
        .createQueryBuilder("post")
        .select(["post.id", "post.content", "post.createdAt"])
        .leftJoin("post.user", "user")
        .addSelect(["user.id", "user.username", "user.avatarColor"])
        .where("user.id IN (:...userId)", { userId: myUserFollowsUser })
        .leftJoin("post.tagged", "tagged")
        .addSelect("tagged.id")
        .orWhere("tagged.id IN (:...tagId)", { tagId: myUserFollowsTag })
        .leftJoin("post.sweeted", "sweeted")
        .addSelect("sweeted.id")
        .orWhere("sweeted.id IN (:...sweetId)", { sweetId: myUserFollowsUser })
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
        .where("user.id IN (:...userId)", { userId: myUserFollowsUser })
        .leftJoin("repost.tagged", "tagged")
        .addSelect("tagged.id")
        .orWhere("tagged.id IN (:...tagId)", { tagId: myUserFollowsTag })
        .leftJoin("repost.sweeted", "sweeted")
        .addSelect("sweeted.id")
        .orWhere("sweeted.id IN (:...sweetId)", { sweetId: myUserFollowsUser })
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