import { Repost } from "../../entity/repost.entity";
import { User } from "../../entity/user.entity";
import { myDataSource } from "../../app-data-source";


const repository = myDataSource.getRepository(User)

async function updatePostWithUsers(thisPost: Repost, users: User[]) {
    const getMyPost = await myDataSource.getRepository(Repost).findOneBy({
        id: +thisPost.id,
    });
    getMyPost.sweeted = users
    const results = await myDataSource.getRepository(Repost).save(getMyPost);
    console.log("UPDATED:", results)
    return results
}

export async function checkUsers(post: Repost) {

    const { content, id } = post
    const matchedUsers: User[] = new Array
    const hasSweetUser = content.includes('@')

    if (hasSweetUser) {
        const existingUsers = await repository.find()
        const existingUsersContent = new Array

        existingUsers.map(u => {
            existingUsersContent.push(u.username)
        })

        const newishText = content.replace(/[.,:;?!"$-%/(*+«»><)=#£&§€{}/\\|´`~^]/g, " ")
        const newText = newishText.replace(/@{2,}/g, "@")

        const words = newText.split(' ')

        words.map(word => {
            if (word.includes('@'))
                if (word.startsWith('@')) {
                    const newWord = word.replace('@', '').toLowerCase();
                    const hasMatch = existingUsersContent.includes(newWord)
                    if (hasMatch) {
                        const index = existingUsersContent.indexOf(newWord)
                        const tagToMatch = existingUsers[index]
                        matchedUsers.push(tagToMatch)
                    }
                } else return
        })

        updatePostWithUsers(post, matchedUsers)

    } else return console.log("No Users Here!")

    console.log(matchedUsers)

}

