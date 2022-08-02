import commonClass from './../../common.module.css'
import React from "react";
import {PlasterDecor} from "./PlasterDecor";
import {authApi} from "../../api/api";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {LogoutTC} from "../../store/reducers/auth-reducer";
import {Navigate} from "react-router-dom";

export const Main = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const me = () => {
        authApi.me().then(res => {
            console.log(res)
        })
            .catch(e => console.log(e))
    }
    const logout = () => {
        dispatch(LogoutTC())
    }
    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={commonClass.wrapper}>
            <PlasterDecor/>
            <button onClick={me}>me</button>
            <button onClick={logout}>logout</button>


        </div>
    )
}