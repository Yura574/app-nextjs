import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./counter-reducer";



export const store = configureStore({
    reducer:{
        counter: counterReducer
    }
})


export type RootStateType = ReturnType<typeof store.getState>


export type AppDispatchType = typeof store.dispatch