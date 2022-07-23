import {Action, AnyAction, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";


const combinedReducer = combineReducers({

})



export const store  = configureStore({
    reducer:{
        counter: counterReducer
    },
})

// export type CombinedReducer = ReturnType<typeof combinedReducer>

export type RootStateType = ReturnType<typeof store.getState>


export type AppDispatchType = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>