import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const users = await myDataSource.getRepository(User).find({
        relations: {
            followsUser: true,
            followsTag: true,
            likes: true,
            likesRepost: true
        },
    });
    console.log(req.headers.authorization, " -all.action.ts");
    console.log(" -all.action.ts 2", req.user);
    return res.json(users)
}

export default action;