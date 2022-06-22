import { myDataSource } from "../../app-data-source";
import { Message } from "../../entity/message.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Message).delete(req.params.id);
    return res.send(results)
};

export default action;