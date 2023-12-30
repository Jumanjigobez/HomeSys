const userState = {
    loggedIn: 0,
    username: ""
}

export const SessionReducer = (state=userState, action) =>{
    switch(action.type){
        case "ADDED_SESSION": {
            return {
                loggedIn: action.loggedIn,
                username: action.username
            }
        }
        case "DELETED_SESSION": {
            return {
                loggedIn: 0,
                username: ""
            }
        }
        default:
            return state
    }
}