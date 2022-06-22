import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Message } from "../../entity/message.entity";

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body);
    const message = await myDataSource.getRepository(Message).create(req.body);
    const results = await myDataSource.getRepository(Message).save(message);
    return res.send(results)
};

export default action;