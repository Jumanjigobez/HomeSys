import { combineReducers } from "redux";

import { SessionReducer } from "./sessionReducer";
import { MenuReducer } from "./menuReducer";

const RootReducer = combineReducers({
    SessionReducer,
    MenuReducer
})

export default RootReducer;