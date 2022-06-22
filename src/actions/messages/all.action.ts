import { myDataSource } from "../../app-data-source";
import { Message } from "../../entity/message.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const messages = await myDataSource.getRepository(Message).find({
        relations: {
            createdBy: true,
            room: true
        },
    });
    return res.json(messages)
};

export default action;