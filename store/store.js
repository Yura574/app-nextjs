import {combineReducers, createStore} from "redux";
import {userReducer} from "./reducers/user-reducer";



const rootReducer = combineReducers({
    users: userReducer
})


export const store = createStore(rootReducer)