import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
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
        },
        deletePurchaseInfo: (state, action:PayloadAction<{id: string}>)=>{
            const index = state.purchasesInfo.findIndex((el)=>el.id ===action.payload.id)
            state.purchasesInfo.splice(index,1)
        }
    }
})

export const purchasesInfoReducer = purchasesInfoSlice.reducer
export const {getPurchasesInfo, addPurchaseInfo, deletePurchaseInfo} = purchasesInfoSlice.actions


export const AddPurchasesInfoTC = (purchaseInfo: PurchasesInfoType, userId: string, unitPrice: string, date: string, ) => (dispatch: Dispatch) => {
    console.log({...purchaseInfo})
    purchaseInfoApi.addInfoPurchase(purchaseInfo, userId, unitPrice, date)
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

export const DeletePurchaseInfoTC = (id: string)=> (dispatch: Dispatch)=>{
    purchaseInfoApi.deletePurchaseInfo(id)
        .then(()=>{
            dispatch(deletePurchaseInfo({id}))
        })
}

export type PurchasesInfoType = {
    title: string
    place: string
    price: string
    amount: string
    unit: string
}