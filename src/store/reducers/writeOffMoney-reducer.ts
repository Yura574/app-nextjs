import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {changeAccount} from "./accounts-reducer";

export type WriteOffType = {
    sum: number
    writeOffEntries: EntryType[]
    investment: EntryType[]
    duty: EntryType[]
}
export type EntryType = {
    title: string
    sum: number
}

const initialState: WriteOffType = {
    sum: 0,
    writeOffEntries: [],
    investment: [],
    duty: []
}

const writeOffMoneySlice = createSlice({
    name: ' writeOffMoney',
    initialState,
    reducers: {
        setSum: (state, action: PayloadAction<number>) => {
            state.sum = state.sum + action.payload
        },
        addWriteOffEntry: (state, action: PayloadAction<EntryType>) => {
            const find = state.writeOffEntries.find(el => el.title === action.payload.title)
            if (find) {
                const index = state.writeOffEntries.indexOf(find)
                state.writeOffEntries[index].sum += action.payload.sum
            } else {
                state.writeOffEntries.push(action.payload)
            }
        },
        deleteWriteOffEntry: (state, action: PayloadAction<EntryType>) => {
            const index = state.writeOffEntries.indexOf(action.payload)
            state.writeOffEntries.splice(index, 1)


        },
        addInvestmentEntry: (state, action: PayloadAction<EntryType>) => {
            const find = state.investment.find(el => el.title === action.payload.title)
            if (find) {
                const index = state.investment.indexOf(find)
                state.investment[index].sum += action.payload.sum
            } else {
                state.investment.push(action.payload)
            }
        },
        deleteInvestmentEntry: (state, action: PayloadAction<EntryType>) => {
            const index = state.investment.indexOf(action.payload)
            state.investment.splice(index, 1)
        },
        addDutyEntry: (state, action: PayloadAction<EntryType>) => {
            state.duty.push(action.payload)
        },
        deleteDutyEntry: (state, action) => {
            const index = state.duty.indexOf(action.payload)
            state.duty.splice(index, 1)
        },
        clearWriteOff: (state) => {
            state.sum = 0
            state.writeOffEntries = []
            state.investment = []
        },
    }
})


export const writeOffMoneyReducer = writeOffMoneySlice.reducer
export const {
    setSum,
    addWriteOffEntry,
    clearWriteOff,
    addInvestmentEntry,
    deleteWriteOffEntry,
    deleteInvestmentEntry,
    addDutyEntry,
    deleteDutyEntry
} = writeOffMoneySlice.actions

export const SetWriteOffMoneyTC = (sum: number, account: string) => (dispatch: Dispatch) => {
    dispatch(addWriteOffEntry({title: account, sum}))
    dispatch(changeAccount({account, sum}))
    dispatch(setSum(sum))
    if (account === 'profit') {
        dispatch(addInvestmentEntry({title: `profit`, sum,}))
    }
}
