import { myDataSource } from "../../app-data-source";
import { Message } from "../../entity/message.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const message = await myDataSource.getRepository(Message).findOneBy({
        id: +req.params.id,
    });
    myDataSource.getRepository(Message).merge(message, req.body);
    const results = await myDataSource.getRepository(Message).save(message);
    return res.send(results)
};

export default action;