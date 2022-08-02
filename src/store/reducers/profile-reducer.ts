import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {authApi} from "../../api/api";
import {initialized, isAuth} from "./auth-reducer";


const initialState = {
    profile: {
        id: '',
        email: '',
        role: {value: 'user', id: ''},
        created: new Date(),
        updated: new Date()
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = {...action.payload}
        },
        deleteProfile: (state, action)=> {
            state.profile= {...action.payload}
        }
    }
})

export const profileReducer = profileSlice.reducer
export const {setProfile, deleteProfile} = profileSlice.actions


export const AuthMeTC = () => (dispatch: Dispatch) => {

    authApi.me()
        .then(res => {
            dispatch(setProfile(res.data))
            dispatch(isAuth(true))
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            dispatch(initialized(true))
        })
}