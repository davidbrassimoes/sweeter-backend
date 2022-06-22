import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/room.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    const rooms = await myDataSource.getRepository(Room).find({
        relations: {
            userInRoom: true,
        },
    });
    return res.json(rooms)
};

export default action;