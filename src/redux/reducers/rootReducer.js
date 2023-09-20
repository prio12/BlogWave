import { combineReducers } from "redux";
import { createUserReducer } from "./userReducer";

const rootReducer = combineReducers({
    user: createUserReducer,
})

export default rootReducer;