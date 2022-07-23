import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";
import { followUserHandler } from "../../services/feed/follow-handler";

const action = async (req: Request, res: Response) => {

    const myUser = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user.id })
        .leftJoin("user.followsUser", "followsUser")
        .addSelect("followsUser.id")
        .getOne()

    const user = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .select(["user.id", "user.username", "user.bio", "user.avatarColor"])
        .where("user.id = :id", { id: req.params.id })
        .loadRelationCountAndMap("user.followers", "user.followers")
        .getOne()

    followUserHandler(myUser, [user])
    return res.send(user);
}

export default action;