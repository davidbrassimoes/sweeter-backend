import { myDataSource } from "../../app-data-source";
import { Post } from "../../entity/post.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const post = await myDataSource.getRepository(Post).findOneBy({
        id: +req.params.id,
    });
    myDataSource.getRepository(Post).merge(post, req.body);
    const results = await myDataSource.getRepository(Post).save(post);
    return res.send(results)
};

export default action;