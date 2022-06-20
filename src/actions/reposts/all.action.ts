import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const reposts = await myDataSource.getRepository(Repost).find();
    return res.json(reposts)
}

export default action;