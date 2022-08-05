import React, {useEffect} from 'react';
import {Header} from "./components/header/Header";
import {Main} from "./components/Main/Main";
import {Footer} from "./components/Footer";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/commonComponent/login/Login";
import {AuthMeTC} from "./store/reducers/profile-reducer";
import {Registration} from "./components/commonComponent/login/Registration";
import {Category} from "./components/commonComponent/Category/Category";
import {SubCategory} from "./components/commonComponent/SubCategory/SubCategory";
import {PersonalArea} from "./components/commonComponent/PersonalArea/PersonalArea";

function App() {
    const initialized = useAppSelector<boolean>(state => state.auth.initialized)
    // const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(AuthMeTC())
    }, [])

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
                    {/*<Route path={'/category/:id'} element={<Category />}/>*/}
                    <Route path={'/subcategory/:id'} element={<SubCategory />}/>
                    <Route path={'/personal-area'} element={<PersonalArea/>} />
                </Routes>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
