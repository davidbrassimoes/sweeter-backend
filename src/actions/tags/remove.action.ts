import { myDataSource } from "../../app-data-source";
import { Tag } from "../../entity/tag.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Tag).delete(req.params.id);
    return res.send(results)
};

export default action;