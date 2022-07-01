import { myDataSource } from "../../app-data-source";
import { Message } from "../../entity/message.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    const message = await myDataSource.getRepository(Message).find({
        where: { id: +req.params.id },
        relations: {
            createdBy: true,
            room: true
        },
    });
    return res.send(message)
};

export default action;