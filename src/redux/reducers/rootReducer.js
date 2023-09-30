import { combineReducers } from "redux";
import { createUserReducer } from "./userReducer";
import { blogReducer } from "./blogsReducer";

const rootReducer = combineReducers({
    user: createUserReducer,
    blogs:blogReducer,
})

export default rootReducer;