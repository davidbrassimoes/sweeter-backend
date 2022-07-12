import { Repost } from "../../entity/repost.entity";
import { Tag } from "../../entity/tag.entity";
import { myDataSource } from "../../app-data-source";


const repository = myDataSource.getRepository(Tag)

async function createTag(tags: Tag[]) {
    const creating = await repository.create(tags);
    const results = await repository.save(creating);
    console.log("CREATED", results)
    return results

}

async function updatePostWithTags(thisPost: Repost, tags: Tag[]) {
    const getMyPost = await myDataSource.getRepository(Repost).findOneBy({
        id: +thisPost.id,
    });
    getMyPost.tagged = tags
    const results = await myDataSource.getRepository(Repost).save(getMyPost);
    console.log("UPDATED:", results)
    return results
}


export async function checkTags(post: Repost) {

    const { content, id } = post

    const hasTags = content.includes('#')

    if (hasTags) {
        const matchedTags: Tag[] = new Array
        const tagsToCreate = new Array
        const existingTags = await repository.find()
        const existingTagsContent = new Array

        existingTags.map(t => {
            existingTagsContent.push(t.content)
        })

        const newishText = content.replace(/[.,:;?!"$-%/(*+«»><)=@&£§€{}/\\|´`~^]/g, " ")
        const newText = newishText.replace(/#{2,}/g, "#")
        const words = newText.split(' ')

        words.map(word => {
            if (word.includes('#')) {

                if (word.endsWith('#')) {
                    return
                } else if (word.startsWith('#') && word.slice(1).includes('#')) {
                    const newWord = word.slice(1).split('#')[1].toLowerCase()
                    const hasMatch = existingTagsContent.includes(newWord)
                    if (hasMatch) {
                        const index = existingTagsContent.indexOf(newWord)
                        const tagToMatch = existingTags[index]
                        matchedTags.push(tagToMatch)
                    } else if (word.endsWith('#')) {
                        return
                    } else {
                        tagsToCreate.push(newWord)
                    }
                } else if (word.startsWith('#')) {
                    const newWord = word.replace('#', '').toLowerCase();
                    const hasMatch = existingTagsContent.includes(newWord)
                    if (hasMatch) {
                        const index = existingTagsContent.indexOf(newWord)
                        const tagToMatch = existingTags[index]
                        matchedTags.push(tagToMatch)
                    } else if (word.endsWith('#')) {
                        return
                    } else {
                        tagsToCreate.push(newWord)
                    }
                }
            }
        })


        const tagsToCreateObject = new Array
        tagsToCreate.map(t => {
            const myObj = {
                "content": t
            }
            tagsToCreateObject.push(myObj)
        })

        const createdRes = await createTag(tagsToCreateObject)

        const totalTags = [...createdRes, ...matchedTags]
        console.log("TOTAL TAGS", totalTags);

        await updatePostWithTags(post, totalTags)

    } else return console.log("No Tags Here!")



    return
}


