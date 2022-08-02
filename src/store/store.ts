import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth-reducer";
import {profileReducer} from "./reducers/profile-reducer";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
    }
})


export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store