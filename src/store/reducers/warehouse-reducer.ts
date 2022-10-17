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
        },
        addWarehouse: (state, action: PayloadAction<WarehouseType>) => {
            state.warehouses = [action.payload, ...state.warehouses]
        },
        deleteWarehouse: (state, action: PayloadAction<string>) => {
            state.warehouses = state.warehouses.filter(el => el.id !== action.payload)
        }
    }
})

export const warehousesReducer = warehousesSlice.reducer
export const {getAllWarehouses, addWarehouse, deleteWarehouse} = warehousesSlice.actions


export const AddWarehouseTC = (userId: string, title: string, success: string, image?: File) => (dispatch: Dispatch) => {
    console.log(image)
    warehouseApi.addWarehouse(userId, title, image)
        .then(res => dispatch(addWarehouse(res.data)))
        .catch(err => console.log(err))
}
export const GetAllWarehousesTC = (userId: string) => (dispatch: Dispatch) => {
    warehouseApi.getAllWarehouses(userId)
        .then(res => dispatch(getAllWarehouses(res.data)))
}
export const DeleteWarehouseTC = (warehouseId: string) => (dispatch: Dispatch) => {
    warehouseApi.deleteWarehouse(warehouseId)
        .then(() => dispatch(deleteWarehouse(warehouseId)))
        .catch(err => console.log(err))
}

type InitialStateType = {
    warehouses: WarehouseType[]
}


export type WarehouseType = {
    id: string
    title: string
    image?: string
}