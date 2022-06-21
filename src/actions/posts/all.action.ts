import { myDataSource } from "../../app-data-source";
import { Post } from "../../entity/post.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const posts = await myDataSource.getRepository(Post).find({
        relations: {
            user: true,
            sweeted: true,
            tagged: true
        },
    });
    return res.json(posts)
};

export default action;