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

    const users = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .select(["user.id", "user.username", "user.bio", "user.avatarColor"])
        .orderBy("user.username")
        .getMany()

    followUserHandler(myUser, users)
    const data = { myUser, users }

    return res.json(data)
}

export default action;