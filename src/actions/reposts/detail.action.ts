import { myDataSource } from "../../app-data-source";
import { Repost } from "../../entity/repost.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    const repost = await myDataSource.getRepository(Repost).find({
        where: { id: +req.params.id },
        relations: {
            user: true,
            post: true
        },
    });
    return res.send(repost);
}

export default action;