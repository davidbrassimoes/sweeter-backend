import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/chat-room.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    const room = await myDataSource.getRepository(Room).findOneBy({
        id: +req.params.id,
    });
    return res.send(room)
};

export default action;