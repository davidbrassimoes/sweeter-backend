import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";

export async function attemptLogin(username: string, password: string): Promise<string> {
    const repository = myDataSource.getRepository(User);
    const user = await repository.findOne({ where: { username } });

    const match = await bcrypt.compare(password, user?.password);

    if (!user || !match) {
        throw new Error('Bad credentials');
    }

    return createToken(user);
}

export async function register(username: string, password: string, email: string, bio: string): Promise<string> {

    const user = await myDataSource.getRepository(User).create();

    user.username = username;
    user.password = await bcrypt.hash(password, 8);
    user.email = email;
    user.bio = bio;

    await myDataSource.getRepository(User).save(user);

    return createToken(user);
}

function createToken(user: User): string {
    const token = sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 180),
        username: user.username,
        email: user.email,
        user_id: user.id
    }, `${process.env.LOG_KEY}`);

    return token;
}