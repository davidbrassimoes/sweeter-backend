export default function sortFeed(feed, myUser) {

    feed.sort((a, b) => {
        const fa = a.createdAt;
        const fb = b.createdAt;

        if (fa < fb) {
            return 1;
        }
        if (fa > fb) {
            return -1;
        }
        return 0;
    })

    feed.map(post => {
        post.myUserLikes = false

        if (post.post == undefined) {
            post.isRepost = false

            myUser.likes.map(l => {
                if (l.id == post.id) {
                    post.myUserLikes = true
                }
            })
        }
        if (post.post != undefined) {
            post.isRepost = true

            myUser.likesRepost.map(l => {
                if (l.id == post.id) {
                    post.myUserLikes = true
                }
            })
        }
    })
}