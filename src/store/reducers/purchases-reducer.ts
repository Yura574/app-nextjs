import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {purchaseApi} from "../../api/api";

export type PurchasesType  = {
    id: string
    title: string
    image: string
}

type initialStateType = {
    purchases: PurchasesType[]
}

const initialState: initialStateType = {
    purchases: []
}

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {
        setPurchases: (state, action: PayloadAction<PurchasesType[]>)=>{
            state.purchases = action.payload
        }
    }
})

export const purchasesReducer = purchasesSlice.reducer
export const {setPurchases} = purchasesSlice.actions


export const WarehousePurchasesTC = (warehouseId: string) => (dispatch: Dispatch) => {
    purchaseApi.getWarehousePurchases(warehouseId)
        .then(res=> {
            console.log(res)
            dispatch(setPurchases(res.data))
        })
}