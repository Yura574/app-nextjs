import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {categoryApi, userApi} from "../../api/api";
import {setSuccess} from "./app-reducer";

export type CategoryType = {
    id: string,
    title: string,
    image: string
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
        addCategory: (state, action: PayloadAction<CategoryType>) => {
            state.categories.push(action.payload)
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            const index = state.categories.findIndex(cat => cat.id === action.payload)
            state.categories.splice(index, 1)
        },
        updateCategory:(state, action:PayloadAction<CategoryType>)=>{
            const index = state.categories.findIndex(cat => cat.id === action.payload.id)
            state.categories.splice(index, 1, action.payload)
}
    }
})

export const categoryReducer = categoriesSlice.reducer
export const {setCategories, addCategory, deleteCategory, updateCategory} = categoriesSlice.actions


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

export const AddCategoryTC = (userId: string, title: string, success: string, image?: File) => (dispatch: Dispatch) => {
    categoryApi.addCategory(userId, title, image)
        .then(res => {
            console.log(res)
            dispatch(addCategory(res.data))
            dispatch(setSuccess(success))
        })
        .catch(err => {
            console.log(err)
        })
}
export const DeleteCategoryTC = (categoryId: string) => (dispatch: Dispatch) => {
    categoryApi.deleteCategory(categoryId)
        .then(res => {
            console.log(res)
            if (!res.data.error) {
                dispatch(deleteCategory(categoryId))
            } else {
                alert(res.data.error.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
}
export const UpdateCategoryTC = (userId: string, title: string,  image?: File)=> (dispatch: Dispatch)=>{
    console.log(userId, title, image)
    categoryApi.updateCategory(userId, title, image)
        .then(res=> {
            dispatch(updateCategory(res.data))
        })
        .catch(err => {
            console.log(err)
        })
}