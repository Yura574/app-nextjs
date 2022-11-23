import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {ledgerApi} from "../../api/api";

type LedgerEntries = {
    count: string
    data: string
    id: string
    operation: string
    price: string
    primeCost: string
    profit: string
    title: string
}

type InitialStateType = {
    ledgerEntries: LedgerEntries[]
}
const initialState: InitialStateType = {
    ledgerEntries: []
}

const ledgerSlice = createSlice({
    name: 'ledgerSlice',
    initialState,
    reducers: {
        setLedgerEntries: (state, action) => {
            state.ledgerEntries = action.payload
        }
    }
})

export const ledgerReducer = ledgerSlice.reducer
export const {setLedgerEntries} = ledgerSlice.actions


export const GetLedgerEntriesTC = (id: string) => (dispatch: Dispatch) => {
    ledgerApi.getLedgerEntries(id)
        .then(res => {
            console.log(res)
            dispatch(setLedgerEntries(res.data))
        })
}