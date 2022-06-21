import { myDataSource } from "../../app-data-source";
import { Post } from "../../entity/post.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    const post = await myDataSource.getRepository(Post).findOneBy({
        id: +req.params.id,

    });
    return res.send(post);
}

export default action;