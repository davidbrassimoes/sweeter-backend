import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body);
    const user = await myDataSource.getRepository(User).create(req.body);
    const results = await myDataSource.getRepository(User).save(user);
    return res.send(results)
};

export default action;