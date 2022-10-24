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
        isAuth: (state, action: PayloadAction<{value:boolean}>) => {
            state.isAuth = action.payload.value
        },
        initialized: (state,action: PayloadAction<{value:boolean}>)=> {
            state.initialized = action.payload.value
        },
        setError: (state, action:PayloadAction<{value:string}>)=> {
         state.error = action.payload.value
        }
    }
})

export const authReducer = authSlice.reducer
export const {isAuth, initialized, setError} = authSlice.actions


export const LoginTC = (email: string, password: string) => (dispatch: Dispatch) => {
    authApi.login(email, password)
        .then(res => {
            dispatch(setProfile(res.data))
            dispatch(isAuth({value: true}))
        })
        .catch(err => {
            if(Array.isArray(err.response.data.message)){
                dispatch(setError({ value:err.response.data.message[0]}))
            }
           else {
               dispatch(setError({ value:err.response.data.message[0]}))
            }
        })
}

export const LogoutTC =()=> (dispatch: Dispatch) => {
    authApi.logout()
        .then(()=> {
            const   profile= {
                id: '',
                email: '',
                role: {value: 'user', id: ''},
                created: '',
                updated: ''
            }
            dispatch(isAuth({value: false}))
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
            dispatch(isAuth({value: true}))
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            if(Array.isArray(err.response.data.message)){
                dispatch(setError(err.response.data.message[0]))
            }
            dispatch(setError(err.response.data.message))
        })
}


export type RegistrationType ={
    name: string,
    email: string,
    password: string
}

