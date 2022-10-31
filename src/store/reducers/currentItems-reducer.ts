import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WarehouseType} from "./warehouse-reducer";
import {PurchasesInfoType} from "./purchasesInfo-reducer";

type initialStateType = {
    currentWarehouse: WarehouseType | null
    createdTitleWarehouse: string
    currentDate: string
    currentImage: File | undefined
    currentPurchase: CurrentPurchaseType
    currentPurchaseInfo: PurchasesInfoType
}
export type CurrentPurchaseType = {
    amount: string
    date: string
    id: string
    image: string
    place: string
    price: string
    title: string
    unit: string
    warehouse: string
}

const initialState: initialStateType = {
    currentWarehouse: null,
    createdTitleWarehouse: '',
    currentDate: '',
    currentImage: undefined,
    currentPurchase: {
        id: '',
        title: '',
        price: '',
        place: '',
        amount: '',
        unit: '',
        image: '',
        warehouse:'',
        date: ''
    },
    currentPurchaseInfo:{
        userId:'',
        title:'',
        place: '',
        price:'',
        amount:'',
        unit:'',
        warehouse: '',
        date:''
    }

}

const currentItemsSlice = createSlice({
    initialState,
    name: 'currentItems',
    reducers: {
        setCurrentWarehouse: (state, action: PayloadAction<WarehouseType | null>) => {
            state.currentWarehouse = action.payload
        },
        setCreatedTitleWarehouse: (state, action:PayloadAction<string>) => {
            state.createdTitleWarehouse = action.payload
        },
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload
        },
        setCurrentImage: (state, action) => {
            state.currentImage = action.payload
        },
        setCurrentPurchase: (state, action) => {
            state.currentPurchase = action.payload
        },
        setCurrentPurchaseInfo: (state, action)=>{
            state.currentPurchaseInfo = action.payload
        }
    }
})


export const currentItemsReducer = currentItemsSlice.reducer
export const {
    setCurrentWarehouse, setCurrentDate,
    setCurrentImage, setCurrentPurchase,
    setCreatedTitleWarehouse,setCurrentPurchaseInfo
} = currentItemsSlice.actions