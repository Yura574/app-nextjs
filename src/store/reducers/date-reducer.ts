import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    date: new Date(),
    currentDate: '',
    openCalendar: false
}


const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setData: (state, action)=> {
            state.date = action.payload
        },
        setCurrentDate: (state, action:PayloadAction<string>)=>{
            state.currentDate = action.payload
        },
        setOpenCalendar: (state, action:PayloadAction<boolean>) => {
            state.openCalendar = action.payload
        }

    }
})



export const dateReducer = dateSlice.reducer
export const {setData, setOpenCalendar, setCurrentDate} = dateSlice.actions