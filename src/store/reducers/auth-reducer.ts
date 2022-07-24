import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {authApi} from "../../api/api";


const initialState = {
    isAuth: false,
    initialized: false

}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
})

export const authReducer = authSlice.reducer


export const LoginTC = (email: string, password: string) => (dispatch: Dispatch) => {

    authApi.login(email, password)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
}


