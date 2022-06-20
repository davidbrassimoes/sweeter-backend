import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Repost).delete(req.params.id);
    return res.send(results)
};

export default action;