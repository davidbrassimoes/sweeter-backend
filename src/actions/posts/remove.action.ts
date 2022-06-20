import { myDataSource } from "../../app-data-source";
import { Post } from "../../entity/post.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Post).delete(req.params.id);
    return res.send(results)
};

export default action;