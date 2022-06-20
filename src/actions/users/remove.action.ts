import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id);
    return res.send(results)
};

export default action;