import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {authApi} from "../../api/api";
import {initialized, isAuth} from "./auth-reducer";


const initialState = {
    profile: {
        id: '',
        name: '',
        email: '',
        role: {value: 'user', id: ''},
        created: '',
        updated: ''
    }
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = {...action.payload}
        },
        deleteProfile: (state, action) => {
            state.profile = {...action.payload}
        }
    }
})

export const profileReducer = profileSlice.reducer
export const {setProfile, deleteProfile} = profileSlice.actions


export const AuthMeTC = () => (dispatch: Dispatch) => {

    authApi.me()
        .then(res => {
            if (res.data.message !== "not authorization") {
                dispatch(setProfile(res.data))
                dispatch(isAuth({value: true}))
            }

        })
        .catch(error => {
            // dispatch(isAuth({value: true}))
            console.log(error)
        })
        .finally(() => {
            // dispatch(isAuth({value: true}))
            dispatch(initialized({value: true}))
        })
}