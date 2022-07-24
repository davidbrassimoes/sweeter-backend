import { myDataSource } from "../../app-data-source"
import { User } from "../../entity/user.entity"

const action = async (req: Request, res: Response) => {
    await myDataSource
        .createQueryBuilder()
        .relation(User, "likesRepost")
        .of(req.user.id)
        .remove(req.params.id)

}

export default action