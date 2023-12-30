
export const sessionAdd = (loggedIn, username) =>{
    return{
        type: "ADDED_SESSION",
        loggedIn: loggedIn,
        username: username
    }
}

export const menuOpen = (value) =>{
    return{
        type: "CHANGED",
        value: value
    }
}