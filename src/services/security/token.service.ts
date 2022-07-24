import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";


const publicEndpoints = [
    '/users/login',
    '/users/create',
    '/posts'
];

export function verifyToken(req: Request, res: Response, next: NextFunction): Response | void {

    if (publicEndpoints.includes(req.path)) {
        console.log("you are in a public endpoint: ", req.path)
        return next();
    }

    const token = req.headers.authorization;

    if (token == null) {
        return res.status(401).json({
            code: 401,
            error: 'Unauthorized',
            message: 'Token not found'
        });
    }

    verify(token, process.env.LOG_KEY, async (err: VerifyErrors, payload: JwtPayload) => {
        if (err) {
            return res.status(403).json({
                code: 403,
                error: 'Forbidden',
                message: err.message
            });
        }

        const { user_id: id } = payload;
        const user = await myDataSource.getRepository(User).findOneBy({ id });
        req.user = user
        next()
    })






}