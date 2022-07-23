import { myDataSource } from "../../app-data-source";
import { Tag } from "../../entity/tag.entity";
import { Request, Response } from "express";
import { User } from "../../entity/user.entity";
import { followTagHandler } from "../../services/feed/follow-handler";

const action = async (req: Request, res: Response) => {
    const myUser = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user.id })
        .leftJoin("user.followsTag", "followsTag")
        .addSelect("followsTag.id")
        .getOne()

    const tags = await myDataSource
        .getRepository(Tag)
        .createQueryBuilder("tag")
        .select(["tag.id", "tag.content"])
        .orderBy("tag.content")
        .getMany()

    followTagHandler(myUser, tags)
    const data = { myUser, tags }

    return res.json(data)
}

export default action;