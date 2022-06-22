import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/room.entity";


const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body);
    const room = await myDataSource.getRepository(Room).create(req.body);
    const results = await myDataSource.getRepository(Room).save(room);
    return res.send(results)
};

export default action;