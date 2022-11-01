import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {purchaseInfoApi} from "../../api/api";
import {WarehouseType} from "./warehouse-reducer";

export type InfoType = {

    id: string
    title: string
    price: string
    place: string
    amount: string
    unit: string
    unitPrice: string
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
        addPurchaseInfo: (state, action) => {
            state.purchasesInfo = [action.payload, ...state.purchasesInfo]
        },
        deletePurchaseInfo: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.purchasesInfo.findIndex((el) => el.id === action.payload.id)
            state.purchasesInfo.splice(index, 1)
        },
        editTitlePurchaseInfo: (state, action: PayloadAction<{ id: string, title: string }>) => {
            state.purchasesInfo = state.purchasesInfo.map(el =>
                el.id === action.payload.id ? {...el, title: action.payload.title}: el)
        }
    }
})

export const purchasesInfoReducer = purchasesInfoSlice.reducer
export const {getPurchasesInfo, addPurchaseInfo, deletePurchaseInfo, editTitlePurchaseInfo} = purchasesInfoSlice.actions


export const AddPurchasesInfoTC = (purchaseInfo: PurchasesInfoType, userId: string) => (dispatch: Dispatch) => {
    console.log({...purchaseInfo})
    purchaseInfoApi.addInfoPurchase(purchaseInfo, userId)
        .then(res => {
            dispatch(addPurchaseInfo(res.data))
        })
}

export const GetPurchasesInfoTC = (userId: string) => (dispatch: Dispatch) => {
    purchaseInfoApi.getPurchasesInfo(userId)
        .then(res => {
            dispatch(getPurchasesInfo(res.data))
        })
}

export const DeletePurchaseInfoTC = (id: string) => (dispatch: Dispatch) => {
    purchaseInfoApi.deletePurchaseInfo(id)
        .then(() => {
            dispatch(deletePurchaseInfo({id}))
        })
}

export type PurchasesInfoType = {
    userId: string
    title: string
    place: string
    price: string
    amount: string
    unit: string
    warehouse: WarehouseType
    date: string
}
export type UpdatePurchasesInfoType = {
    title: string
    place: string
    price: string
    amount: string
    unit: string
    date: string
}