import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Tag } from "../../entity/tag.entity";

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body);
    const tag = await myDataSource.getRepository(Tag).create(req.body);
    const results = await myDataSource.getRepository(Tag).save(tag);
    return res.send(results)
};

export default action;