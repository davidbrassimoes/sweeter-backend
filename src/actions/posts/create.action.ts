import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Post } from "../../entity/post.entity";

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body);
    const post = await myDataSource.getRepository(Post).create(req.body);
    const results = await myDataSource.getRepository(Post).save(post);
    return res.send(results)
};

export default action;