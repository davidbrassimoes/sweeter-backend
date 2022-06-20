import { myDataSource } from "../../app-data-source";
import { Message } from "../../entity/chat-message.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const messages = await myDataSource.getRepository(Message).find();
    return res.json(messages)
};

export default action;