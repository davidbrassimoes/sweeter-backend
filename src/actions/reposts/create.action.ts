import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";
import { checkTags } from "../../services/reposts/check-tags-in-repost.service";
import { checkUsers } from "../../services/reposts/check-users-in-repost.service";

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body)
    const repost = await myDataSource.getRepository(Repost).create(req.body);
    const results = await myDataSource.getRepository(Repost).save(repost);
    checkTags(repost)
    checkUsers(repost)
    return res.send(results)
};

export default action;