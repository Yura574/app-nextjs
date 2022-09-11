import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {goodsApi} from "../../api/api";

export type GoodsType = {
    id: string
    title: string
    image: string
}
type InitialStateType = {
    goods: GoodsType[]
}

const initialState: InitialStateType = {
    goods: []
}

const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setGoods: (state, action: PayloadAction<GoodsType[]>) => {
            state.goods = action.payload
        }
    }
})


export const goodsReducer = goodsSlice.reducer
export const {setGoods} = goodsSlice.actions


export const SetGoodsTC = (subCategoryId: string) => (dispatch: Dispatch) => {
    goodsApi.goods(subCategoryId)
        .then(res => {
            dispatch(setGoods(res.data))
        })
        .catch(err => {
            console.log(err)
        })
}