const menuOpened = false;

export const MenuReducer = (state = menuOpened, action) => {
    switch(action.type){
        case "CHANGED": {
            return action.value
        }
        default: 
            return state
    }
}