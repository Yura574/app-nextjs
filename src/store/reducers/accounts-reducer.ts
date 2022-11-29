import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {accountsApi} from "../../api/api";

type InitialStateType = {

    accounts: {
        profit: number,
        primeCost: number,
        investment: number,
        duty: number
    }
}

const initialState: InitialStateType = {
    accounts: {
        profit: 0,
        primeCost: 0,
        investment: 0,
        duty: 0,

    }
}

const accountsSlice = createSlice({
    name: ' accounts',
    initialState,
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload
        },
        changeAccount: (state, action:PayloadAction<{sum: number, account:string}>)=>{
            switch (action.payload.account){
                case 'profit': {
                     state.accounts.profit -= action.payload.sum
                    break
                }
                case 'primeCost': {
                      state.accounts.primeCost -= action.payload.sum
                    break
                }
            }
        },
        recoveryAccount: (state, action:PayloadAction<{sum: number, account:string}>)=>{
            switch (action.payload.account){
                case 'profit': {
                    state.accounts.profit += action.payload.sum
                    break
                }
                case 'primeCost': {
                    state.accounts.primeCost += action.payload.sum
                    break
                }
            }
        }
    }
})


export const accountsReducer = accountsSlice.reducer
export const {setAccounts, changeAccount, recoveryAccount   } = accountsSlice.actions


export const GetAccountsTC = (userId: string) => (dispatch: Dispatch) => {
    accountsApi.getAccounts(userId)
        .then(res => {
            dispatch(setAccounts(res.data))
        })
}