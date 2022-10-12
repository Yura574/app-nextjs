import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {subCategoryApi} from "../../api/api";

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
        },
        addSubCategory: (state, action: PayloadAction<SubCategoryType>)=> {
          state.subCategories.push(action.payload)
        },
        deleteSubCategories: (state, action: PayloadAction<string>)=>{
            const index = state.subCategories.findIndex(subCat => subCat.id === action.payload)
            state.subCategories.splice(index, 1)
        }
    }
})

export const subCategoryReducer = subCategorySlice.reducer
export const {setSubCategories, deleteSubCategories, addSubCategory} = subCategorySlice.actions

export const getSubCategoriesTC = (categoryId: string) => (dispatch: Dispatch) => {
    subCategoryApi.getSubCategories(categoryId)
        .then(res => {
            dispatch(setSubCategories(res.data.subCategories))
        })
        .catch(err => {
            console.log(err)
        })

}

export const AddSubCategoryTC = (catId: string, title: string, image?: File) => (dispatch: Dispatch)=>{
    subCategoryApi.addSubCategory(catId,title, image)
        .then(res => {
            console.log(res)
            dispatch(addSubCategory(res.data))
        })
}

export const DeleteSubCategoryTC = (subCatId: string) => (dispatch: Dispatch) => {
    subCategoryApi.deleteSubCategory(subCatId)
        .then(res => {
            console.log(res)
            dispatch(deleteSubCategories(subCatId))
        })
        .catch( err => {
            console.log(err)
        })
}

