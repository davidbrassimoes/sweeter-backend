import { myDataSource } from "../../app-data-source";
import { Tag } from "../../entity/tag.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const tags = await myDataSource.getRepository(Tag).find();
    return res.json(tags)
}

export default action;