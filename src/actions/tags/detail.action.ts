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

    const tag = await myDataSource
        .getRepository(Tag)
        .createQueryBuilder("tag")
        .select(["tag.id", "tag.content"])
        .where("tag.id = :id", { id: req.params.id })
        .loadRelationCountAndMap("tag.followers", "tag.followers")
        .getOne()

    followTagHandler(myUser, [tag])
    return res.send(tag);
}

export default action;