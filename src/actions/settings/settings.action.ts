import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const myUser = await myDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: req.user.id })
        .leftJoinAndSelect("user.followsTag", "followsTag")
        .leftJoinAndSelect("user.followsUser", "followsUser")
        .loadRelationCountAndMap("user.followers", "user.followers")
        .getOne()

    return res.json(myUser)
}

export default action;