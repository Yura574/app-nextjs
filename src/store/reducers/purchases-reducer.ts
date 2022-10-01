import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {purchaseApi} from "../../api/api";
import {WarehouseType} from "./warehouse-reducer";
import {log} from "util";

// export type PurchasesType  = {
//     id: string
//     title: string
//     image: string
// }

const initialState: initialStateType = {
    purchases: [],
    currentWarehouse: null,
    currentPurchase: {
        date: '',
        image: null,
        amount: '',
        place: '',
        unit: '',
        price: '',
        title: '',
        warehouseId: ''

    }
}

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: initialState,
    reducers: {
        setPurchases: (state, action: PayloadAction<PurchaseType[]>)=>{
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


export const AddPurchasesTC = (purchase: PurchaseType)=> (dispatch: Dispatch)=> {
    purchaseApi.addPurchase(purchase  )
        .then(res => {
            console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
}

type initialStateType = {
    purchases: PurchaseType[]
    currentWarehouse: WarehouseType | null
    currentPurchase: PurchaseType
}


export type PurchaseType ={
    warehouseId: string | null,
    title: string,
    date: string,
    price?: string,
    place?: string,
    amount?: string,
    unit?: string
    image?: any
}
