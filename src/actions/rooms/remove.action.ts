import { myDataSource } from "../../app-data-source";
import { Room } from "../../entity/room.entity";
import { Request, Response } from "express";

const action = async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Room).delete(req.params.id);
    return res.send(results)
};

export default action;