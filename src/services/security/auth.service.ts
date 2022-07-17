import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { myDataSource } from "../../app-data-source";
import { User } from "../../entity/user.entity";

export async function attemptLogin(username: string, password: string): Promise<string> {
    const repository = myDataSource.getRepository(User);
    const user = await repository.createQueryBuilder('user')
        .where('user.username = :username', { username })
        .addSelect('user.password')
        .leftJoinAndSelect("user.followsUser", "followsUser")
        .leftJoinAndSelect("user.followsTag", "followsTag")
        .leftJoinAndSelect("user.likes", "likes")
        .leftJoinAndSelect("user.likesRepost", "likesRepost")
        .getOne()

    const match = await bcrypt.compare(password, user?.password);

    if (!user || !match) {
        throw new Error('Bad credentials');
    }

    return createToken(user);
}

export async function register(username: string, password: string, email: string, bio: string, avatarColor: string): Promise<Object> {

    const user = await myDataSource.getRepository(User).create();

    user.username = username;
    user.password = await bcrypt.hash(password, 8);
    user.email = email;
    user.bio = bio;
    user.avatarColor = avatarColor;

    await myDataSource.getRepository(User).save(user);
    const token = createToken(user)
    return ({ token, user })
}

function createToken(user: User): Object {
    const token = sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 180),
        username: user.username,
        email: user.email,
        user_id: user.id
    }, `${process.env.LOG_KEY}`);

    return ({ token: token, user });
}