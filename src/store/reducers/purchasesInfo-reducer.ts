import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {purchaseInfoApi} from "../../api/api";

export type InfoType = {

    id: string
    title: string
    price: string
    place: string
    amount: string
    unit: string
    date: string

}
type InitialStateType = {
    purchasesInfo: InfoType[]
}

const initialState: InitialStateType = {
    purchasesInfo: []
}

const purchasesInfoSlice = createSlice({
    initialState,
    name: 'purchaseInfo',
    reducers: {
        getPurchasesInfo: (state, action) => {
            state.purchasesInfo = action.payload
        },
        addPurchaseInfo: (state, action)=>{
            state.purchasesInfo = [action.payload, ...state.purchasesInfo]
        }
    }
})

export const purchasesInfoReducer = purchasesInfoSlice.reducer
export const {getPurchasesInfo, addPurchaseInfo} = purchasesInfoSlice.actions


export const AddPurchasesInfoTC = (purchaseInfo: PurchasesInfoType, userId: string, date: string, ) => (dispatch: Dispatch) => {
    console.log({...purchaseInfo})
    purchaseInfoApi.addInfoPurchase(purchaseInfo, userId, date)
        .then(res => {
            console.log(res.data)
            dispatch(addPurchaseInfo(res.data))
        })
}

export const GetPurchasesInfoTC = (userId: string) => (dispatch: Dispatch) => {
    purchaseInfoApi.getPurchasesInfo(userId)
        .then(res => {
            console.log(res)
            dispatch(getPurchasesInfo(res.data))
        })
}

export type PurchasesInfoType = {
    title: string
    place: string
    price: string
    amount: string
    unit: string
}