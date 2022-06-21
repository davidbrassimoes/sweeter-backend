import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const users = await myDataSource.getRepository(User).find({
        relations: {
            followsUser: true,
            followsTag: true,
            likes: true
        },
    });
    return res.json(users)
}

export default action;