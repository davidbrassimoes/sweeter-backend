import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const reposts = await myDataSource.getRepository(Repost).find({
        relations: {
            user: true,
            post: true
        },
    });
    return res.json(reposts)
}

export default action;