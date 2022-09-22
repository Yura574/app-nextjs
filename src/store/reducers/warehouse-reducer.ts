import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {warehouseApi} from "../../api/api";


const initialState: InitialStateType = {
    warehouses: []
}


const warehousesSlice = createSlice({
    name: 'warehouses',
    initialState: initialState,
    reducers: {
        getAllWarehouses: (state, action: PayloadAction<WarehouseType[]>) => {
            state.warehouses = action.payload
        }
    }
})

export const warehousesReducer = warehousesSlice.reducer
export const {getAllWarehouses} = warehousesSlice.actions


export const AddWarehouseTC = (userId: string, title: string, image: File) => (dispatch: Dispatch) => {
    warehouseApi.addWarehouse(userId, title, image)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
export const getAllWarehousesTC = (userId: string) => (dispatch: Dispatch) => {
    warehouseApi.getAllWarehouses(userId)
        .then(res => {
            console.log(res.data)
            dispatch(getAllWarehouses(res.data))
        })
}

type InitialStateType = {
    warehouses: WarehouseType[]
}


export type WarehouseType = {
    id: string
    title: string
    image: string
}