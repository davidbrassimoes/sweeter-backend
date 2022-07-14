import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";
import { Request, Response } from "express";

const action = async (req: Request, res: Response) => {
    console.log('TEST!', req.params.id);
    // const user = await myDataSource.getRepository(User).findOneBy({
    //     id: +req.params.id,
    // });
    const user = await myDataSource.getRepository(User).find({
        where: { id: +req.params.id },
        relations: {
            followsUser: true,
            followsTag: true,
            likes: true,
            likesRepost: true
        }
    });
    return res.send(user);
}

export default action;