
import commonClass from './../../common.module.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "../commonComponent/login/Login";
import React from "react";
import {PlasterDecor} from "./PlasterDecor";

export const Main =( ) => {
    return (
        <div className={commonClass.wrapper}>
           <PlasterDecor />


        </div>
    )
}