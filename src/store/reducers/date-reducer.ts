import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    currentDate: new Date(),
    openCalendar: false
}


const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setData: (state, action)=> {
            state.currentDate = action.payload
        },
        setOpenCalendar: (state, action:PayloadAction<boolean>) => {
            state.openCalendar = action.payload
        }

    }
})



export const dateReducer = dateSlice.reducer
export const {setData, setOpenCalendar} = dateSlice.actions