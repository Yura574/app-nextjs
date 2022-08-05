import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {categoryApi} from "../../api/api";

export type SubCategoryType = {
    id: string,
    title: string,
    image: string
}
type InitialStateType = {
    subCategories: SubCategoryType[]
}

const initialState: InitialStateType = {
    subCategories: []
}


const subCategorySlice = createSlice({
    name: 'sub-category',
    initialState,
    reducers: {
        setSubCategories: (state, action: PayloadAction<SubCategoryType[]>) => {
            state.subCategories = action.payload
        }
    }
})

export const subCategoryReducer = subCategorySlice.reducer
export const {setSubCategories} = subCategorySlice.actions

export const SubCategoriesTC = (categoryId: string) => (dispatch: Dispatch) => {
    categoryApi.subCategories(categoryId)
        .then(res => {
            dispatch(setSubCategories(res.data.subCategories))
        })
        .catch(err => {
            console.log(err)
        })

}

