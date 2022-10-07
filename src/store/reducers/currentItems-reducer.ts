import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WarehouseType} from "./warehouse-reducer";

type initialStateType = {
    currentWarehouse: WarehouseType | null
    currentDate: string
    currentImage: File | undefined
    currentPurchase: CurrentPurchaseType
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
}

const initialState: initialStateType = {
    currentWarehouse: null,
    currentDate: '',
    currentImage: undefined,
    currentPurchase:  {
        id: '',
        title: '',
        price: '',
        place: '',
        amount: '',
        unit: '',
        image: '',
        date: ''
    }
}

const currentItemsSlice = createSlice({
    initialState,
    name: 'currentItems',
    reducers: {
        setCurrentWarehouse: (state, action: PayloadAction<WarehouseType>) => {
            state.currentWarehouse = action.payload
        },
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload
        },
        setCurrentImage: (state, action) => {
            state.currentImage = action.payload
        },
        setCurrentPurchase: (state, action)=>{
            state.currentPurchase = action.payload
        }
    }
})


export const currentItemsReducer = currentItemsSlice.reducer
export const {setCurrentWarehouse, setCurrentDate, setCurrentImage, setCurrentPurchase} = currentItemsSlice.actions