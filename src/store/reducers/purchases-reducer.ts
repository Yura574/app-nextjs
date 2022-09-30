import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {purchaseApi} from "../../api/api";
import {WarehouseType} from "./warehouse-reducer";
import {log} from "util";

export type PurchasesType  = {
    id: string
    title: string
    image: string
}

type initialStateType = {
    purchases: PurchasesType[]
    currentWarehouse: WarehouseType | null
}

const initialState: initialStateType = {
    purchases: [],
    currentWarehouse: null
}

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {
        setPurchases: (state, action: PayloadAction<PurchasesType[]>)=>{
            state.purchases = action.payload
        },
        setCurrentWarehouse: (state, action:PayloadAction<WarehouseType>)=> {
            state.currentWarehouse = action.payload
        }
    }
})

export const purchasesReducer = purchasesSlice.reducer
export const {setPurchases, setCurrentWarehouse} = purchasesSlice.actions


export const WarehousePurchasesTC = (warehouseId: string) => (dispatch: Dispatch) => {
    purchaseApi.getWarehousePurchases(warehouseId)
        .then(res=> {
            console.log(res)
            dispatch(setPurchases(res.data))
        })
}

export const AddPurchasesTC = (warehouseId: string | null, title: string, date: string, price?: number, place?: string, amount?: number, unit?: string, image?: File)=> (dispatch: Dispatch)=> {
    purchaseApi.addPurchase(warehouseId,title, date, price, place, amount, unit, image  )
        .then(res => {
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
}