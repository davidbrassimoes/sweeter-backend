import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body)
    const repost = await myDataSource.getRepository(Repost).create(req.body);
    const results = await myDataSource.getRepository(Repost).save(repost);
    return res.send(results)
};

export default action;