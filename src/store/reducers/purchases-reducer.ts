import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {purchaseApi, purchaseInfoApi} from "../../api/api";
import {addPurchaseInfo, PurchasesInfoType} from "./purchasesInfo-reducer";


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
        },
        addNewPurchases: (state, action) => {
            state.purchases = [...state.purchases, action.payload]
        },
        deletePurchase: (state, action: PayloadAction<{ purchaseId: string }>) => {
            const index = state.purchases.findIndex(el => el.id === action.payload.purchaseId)
            state.purchases.splice(index, 1)
        }

    }
})

export const purchasesReducer = purchasesSlice.reducer
export const {
    setPurchases, setAllPurchases, addNewPurchases,
    deletePurchase
} = purchasesSlice.actions

export const WarehousePurchasesTC = (warehouseId: string) => (dispatch: Dispatch) => {
    purchaseApi.getWarehousePurchases(warehouseId)
        .then(res => {
            console.log(res)
            dispatch(setPurchases(res.data))
        })
        .catch(err => console.log(err))
}

export const AddPurchasesTC = (purchase: PurchasesInfoType,
                               unitPrice: string,
                               image?: File) => (dispatch: Dispatch) => {
    purchaseApi.addPurchase(purchase, unitPrice, image)
        .then(res => {
            dispatch(addNewPurchases(res.data))
            purchaseInfoApi.addInfoPurchase(purchase, unitPrice)
                .then(res => {
                    dispatch(addPurchaseInfo(res.data))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

export const GetAllPurchasesTC = (userId: string) => (dispatch: Dispatch) => {
    purchaseApi.getAllPurchase(userId)
        .then(res => dispatch(setAllPurchases(res.data)))
        .catch(err => console.log(err))
}

export const DeletePurchaseTC = (purchaseId: string) => (dispatch: Dispatch) => {
    purchaseApi.deletePurchase(purchaseId)
        .then(() => dispatch(deletePurchase({purchaseId})))
        .catch(err => console.log(err))
}

type initialStateType = {
    purchases: PurchaseType[]
    allPurchases: Array<AllPurchaseType>
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
    unitPrice?: string
    image?: string
}
export type AllPurchaseType = {
    id: string
    warehouseId: string
    title: string
    price: string
    place: string
    amount: string
    unit: string
    unitPrice: string
    image: string
    date: string
}