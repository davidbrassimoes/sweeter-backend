import { Request, Response } from "express";
import { register } from "../../services/security/auth.service"

const action = async (req: Request, res: Response) => {
    console.log('TEST!!', req.body);
    try {
        const { username, password, email, bio } = req.body;
        const token = await register(username, password, email, bio);
        console.log("TOKEN: ", token);
        return res.json({ token });
    } catch (e) {
        return res.status(400).json({
            code: 400,
            error: 'Bad request',
            message: e.message
        });
    }
};

export default action;