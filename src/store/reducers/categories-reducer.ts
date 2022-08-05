import {createSlice} from "@reduxjs/toolkit";

type CategoryType = {
    id: '',
    title: '',
    image: ''
}

const initialState = {
    category: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.category = action.payload
        }
    }
})