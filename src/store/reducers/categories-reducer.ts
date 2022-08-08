import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {categoryApi, userApi} from "../../api/api";
import {setSuccess} from "./app-reducer";

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
        },
        addCategory: (state, action:PayloadAction<CategoryType>)=> {
            state.categories.push(action.payload)
        }
    }
})

export const categoryReducer = categoriesSlice.reducer
export const {setCategories, addCategory} = categoriesSlice.actions


export const GetCategoriesTC = (userId: string) => (dispatch: Dispatch) => {
    userApi.categories(userId)
        .then(res => {
            console.log(res.data.categories)
            dispatch(setCategories(res.data.categories))
        })
        .catch(err => {
            console.log(err)
        })
}

export const AddCategoryTC = (userId: string, title: string,  success: string, image?: File) => (dispatch: Dispatch) => {
    categoryApi.addCategory(userId, title, image)
        .then(res=> {
            console.log(res)
            dispatch(addCategory(res.data))
            dispatch(setSuccess(success))
        })
        .catch(err => {
            console.log(err)
        })
}