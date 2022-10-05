import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {purchaseInfoApi} from "../../api/api";


const initialState = {

}

const purchasesInfoSlice = createSlice({
    initialState,
    name: 'purchaseInfo',
    reducers: {

    }
})

export const purchasesInfoReducer = purchasesInfoSlice.reducer
export const {} = purchasesInfoSlice.actions



export const AddPurchasesInfoTC = (purchaseInfo: PurchasesInfoType)=> (dispatch: Dispatch)=> {
    purchaseInfoApi.addInfoPurchase(purchaseInfo)
        .then(res => {
            console.log(res)
        })
}

export type PurchasesInfoType = {
    userId: string
     title: string
    place: string
    price: string
    amount: string
    unit:string
    warehouse:string
    date: string
}