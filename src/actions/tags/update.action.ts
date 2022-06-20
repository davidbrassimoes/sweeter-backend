import { myDataSource } from "../../app-data-source";
import { Tag } from "../../entity/tag.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const tag = await myDataSource.getRepository(Tag).findOneBy({
        id: +req.params.id,
    });
    myDataSource.getRepository(Tag).merge(tag, req.body);
    const results = await myDataSource.getRepository(Tag).save(tag);
    return res.send(results)
};

export default action;