import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth-reducer";
import {profileReducer} from "./reducers/profile-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store