import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    success: ''
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers: {
        setSuccess: (state, action:PayloadAction<string>)=>{
            state.success = action.payload
        }
    }
})

export const appReducer = appSlice.reducer
export const {setSuccess} = appSlice.actions