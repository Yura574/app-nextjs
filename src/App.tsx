import React, {useEffect} from 'react';
import {userApi} from "./DAL/api";
import {Header} from "./Componets/1_Header/Header";
import { Main } from './Componets/2_Main/Main';
import {Footer} from "./Componets/3_Footer/Footer";



function App() {

    useEffect(() => {
        userApi.me()
            .then(res => {
                console.log(res.data)
            })
    })

    return (
        <div >
            <Header/>
            <Main />
            <Footer/>
        </div>
    );
}

export default App;
