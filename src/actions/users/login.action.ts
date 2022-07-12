import { Request, Response } from "express";
import { attemptLogin } from "../../services/security/auth.service";

const action = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await attemptLogin(username, password);
        console.log("TOKEN: ", token);
        return res.json(token);
    } catch (e) {
        return res.status(401).json({
            code: 401,
            error: 'Unauthorized',
            message: e.message
        });
    }
}

export default action;