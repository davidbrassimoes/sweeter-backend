import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/chat-room.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const rooms = await myDataSource.getRepository(Room).find();
    return res.json(rooms)
};

export default action;