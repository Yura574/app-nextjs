import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {userApi} from "../../api/api";

export type CategoryType = {
    id: '',
    title: '',
    image: ''
}
type InitialStateType = {
    categories: CategoryType[]
}

const initialState: InitialStateType = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryType[]>) => {
            state.categories = action.payload
        }
    }
})

export const categoryReducer = categoriesSlice.reducer
export const {setCategories} = categoriesSlice.actions


export const GetCategoriesTC = (userId: string) => (dispatch: Dispatch)=> {
    userApi.categories(userId)
        .then(res => {
            console.log(res.data.categories)
            dispatch(setCategories(res.data.categories))
        })
        .catch(err => {
            console.log( err)
        })
}