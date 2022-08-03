import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../../api/api";
import {deleteProfile, setProfile} from "./profile-reducer";


const initialState = {
    isAuth: false,
    initialized: false,
    error: ''

}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        initialized: (state,action: PayloadAction<boolean>)=> {
            state.initialized = action.payload
        },
        setError: (state, action:PayloadAction<string>)=> {
         state.error = action.payload
        }
    }
})

export const authReducer = authSlice.reducer
export const {isAuth, initialized, setError} = authSlice.actions


export const LoginTC = (email: string, password: string) => (dispatch: Dispatch) => {
    authApi.login(email, password)
        .then(res => {
            dispatch(setProfile(res.data))
            dispatch(isAuth(true))
        })
        .catch(err => {
            console.warn(err)
        })
}

export const LogoutTC =()=> (dispatch: Dispatch) => {
    authApi.logout()
        .then(res=> {
            const   profile= {
                id: '',
                email: '',
                role: {value: 'user', id: ''},
                created: new Date(),
                updated: new Date()
            }
            dispatch(isAuth(false))
            dispatch(deleteProfile(profile))
        })
        .catch(err => {
            console.log(err)
        })
}

export const RegistrationTC =(user: RegistrationType) => (dispatch: Dispatch)=> {
    authApi.registration(user)
        .then(res=> {
            console.log(res)
            dispatch(setProfile(res.data))
        })
        .catch(err => {
            console.log(err)
            // dispatch(setError(err.response.data.message[0]))
        })
}


export type RegistrationType ={
    name: string,
    email: string,
    password: string
}

