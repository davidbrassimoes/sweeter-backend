import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/room.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    const room = await myDataSource.getRepository(Room).find({
        where: { id: +req.params.id },
        relations: {
            createdBy: true,
            userInRoom: true
        },
    });
    return res.send(room)
};

export default action;