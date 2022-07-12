import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Post } from "../../entity/post.entity";
import { checkTags } from "../../services/posts/check-tags-in-post.service";
import { checkUsers } from "../../services/posts/check-users-in-post.service";

const action = async (req: Request, res: Response) => {
    const post = await myDataSource.getRepository(Post).create(req.body);
    const results = await myDataSource.getRepository(Post).save(post);
    checkTags(post)
    checkUsers(post)
    return res.send(results)
};

export default action;