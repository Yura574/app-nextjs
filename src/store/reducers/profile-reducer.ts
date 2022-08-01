import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    id: '',
    email: '',
    created: '',
    updated: '',
    role:{
        value: 'user',
        id: ''
    }
}

export const profileSlice = createSlice({
    name:'profile',
    initialState,
    reducers:{
        setProfile: ()=>{

        }
    }
})

export const profileReducer = profileSlice.reducer