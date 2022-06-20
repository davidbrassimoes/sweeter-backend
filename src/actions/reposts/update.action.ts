import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const repost = await myDataSource.getRepository(Repost).findOneBy({
        id: +req.params.id,
    });
    myDataSource.getRepository(Repost).merge(repost, req.body);
    const results = await myDataSource.getRepository(Repost).save(repost);
    return res.send(results)
};

export default action;