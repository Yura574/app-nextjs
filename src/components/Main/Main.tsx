
import commonClass from './../../common.module.css'
import React from "react";
import {PlasterDecor} from "./PlasterDecor";
import {authApi} from "../../api/api";

export const Main =( ) => {
    const me = ()=> {
        authApi.me().then(res =>{
            console.log(res)
        })
            .catch(e=> console.log(e))
    }
    return (
        <div className={commonClass.wrapper}>
           <PlasterDecor />
            <button onClick={me}>me</button>


        </div>
    )
}