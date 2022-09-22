import {createSlice} from "@reduxjs/toolkit";

const initialState = {

}

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {

    }
})

export const purchasesReducer = purchasesSlice.reducer
export const {} = purchasesSlice.actions