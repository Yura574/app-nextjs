import React, {useEffect} from 'react';
import {Header} from "./components/header/Header";
import {Main} from "./components/Main/Main";
import {Footer} from "./components/Footer";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/commonComponent/login/Login";
import {AuthMeTC} from "./store/reducers/profile-reducer";
import {Registration} from "./components/commonComponent/login/Registration";

function App() {
    const initialized = useAppSelector<boolean>(state => state.auth.initialized)
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    useEffect(()=> {

        dispatch(AuthMeTC())

    }, [isAuth])



    if (!initialized) {
        return <div>загрузка</div>
    }


    return (
        <div>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration />}/>
                </Routes>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
