import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/room.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const room = await myDataSource.getRepository(Room).findOneBy({
        id: +req.params.id,
    });
    myDataSource.getRepository(Room).merge(room, req.body);
    const results = await myDataSource.getRepository(Room).save(room);
    return res.send(results)
};

export default action;