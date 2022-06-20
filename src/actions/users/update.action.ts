import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: +req.params.id,
    });
    myDataSource.getRepository(User).merge(user, req.body);
    const results = await myDataSource.getRepository(User).save(user);
    return res.send(results)
};

export default action;