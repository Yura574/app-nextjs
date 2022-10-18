import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {purchaseApi} from "../../api/api";
import {WarehouseType} from "./warehouse-reducer";
import {PurchasesInfoType} from "./purchasesInfo-reducer";

// export type PurchasesType  = {
//     id: string
//     title: string
//     image: string
// }

const initialState: initialStateType = {
    purchases: [],
    allPurchases: []

}

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {
        setPurchases: (state, action: PayloadAction<PurchaseType[]>) => {
            state.purchases = action.payload
        },
        setAllPurchases: (state, action) => {
            state.allPurchases = action.payload
        }

    }
})

export const purchasesReducer = purchasesSlice.reducer
export const {setPurchases, setAllPurchases} = purchasesSlice.actions

export const WarehousePurchasesTC = (warehouseId: string) => (dispatch: Dispatch) => {
    purchaseApi.getWarehousePurchases(warehouseId)
        .then(res => {
            console.log(res)
            dispatch(setPurchases(res.data))
        })
}


export const AddPurchasesTC = (purchase: PurchasesInfoType,
                               userId: string,
                               date: string,
                               unitPrice: number,
                               warehouseId?: string,
                               image?: File) => (dispatch: Dispatch) => {
    console.log({...purchase}, date, warehouseId, image)
    purchaseApi.addPurchase(purchase, userId, date,unitPrice, warehouseId, image)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const GetAllPurchasesTC = (userId: string) => (dispatch: Dispatch) => {
    purchaseApi.getAllPurchase(userId)
        .then(res => {
            console.log(res)
            dispatch(setAllPurchases(res.data))
        })
}

type initialStateType = {
    purchases: PurchaseType[]
    allPurchases: Array<any>
    // currentWarehouse: WarehouseType | null
}


export type PurchaseType = {
    id?: string
    warehouseId: string | undefined
    title: string,
    price?: string,
    place?: string,
    amount?: string,
    unit?: string
    image?: string
}