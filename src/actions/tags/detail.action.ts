import { myDataSource } from "../../app-data-source";
import { Tag } from "../../entity/tag.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    const tag = await myDataSource.getRepository(Tag).findOneBy({
        id: +req.params.id,
    });
    return res.send(tag);
}

export default action;