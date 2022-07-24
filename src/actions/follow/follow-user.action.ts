import { myDataSource } from "../../app-data-source"
import { User } from "../../entity/user.entity"

const action = async (req: Request, res: Response) => {
    await myDataSource
        .createQueryBuilder()
        .relation(User, "followsUser")
        .of(req.user.id)
        .add(req.params.id)
}

export default action