export function followUserHandler(myUser, users) {

    const myUserFollowsUser = myUser?.followsUser.map(x => x.id)

    users.map(u => {
        u.followsThisUser = false
    })

    myUserFollowsUser.map(x => {
        users.map(u => {
            if (x === u.id) {
                u.followsThisUser = true
            }
        })
    })
}

export function followTagHandler(myUser, tags) {

    const myUserFollowsTag = myUser?.followsTag.map(x => x.id)

    tags.map(t => {
        t.followsThisTag = false
    })

    myUserFollowsTag.map(x => {
        tags.map(t => {
            if (x === t.id) {
                t.followsThisTag = true
            }
        })
    })
}

