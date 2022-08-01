import React from 'react';
import {Header} from "./components/header/Header";
import {Main} from "./components/Main/Main";
import {Footer} from "./components/Footer";
import {useAppSelector} from "./store/hooks";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/commonComponent/login/Login";

function App() {
    const initialized = useAppSelector(state => state.auth.initialized)



    if (initialized) {
        return <div>загрузка</div>
    }
    return (
        <div>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
