import React, {useEffect} from 'react';
import {Header} from "./components/header/Header";
import {Main} from "./components/Main/Main";
import {Footer} from "./components/Footer";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/login/Login";
import {AuthMeTC} from "./store/reducers/profile-reducer";
import {Registration} from "./components/login/Registration";
import {SubCategory} from "./components/Personal/SubCategory/SubCategory";
import {PersonalArea} from "./components/Personal/PersonalArea";
import {PersonalShop} from "./components/Personal/PersonalShop";
import {Products} from "./components/Personal/Products/Products";

function App() {
    const initialized = useAppSelector<boolean>(state => state.auth.initialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(AuthMeTC())
    }, [dispatch])

    if (!initialized) {
        return <div>загрузка</div>
    }

    return (
        <div>
            <div className="App">
                <Header/>
                <Routes>
                    {/*<Route path={'personal-area/favorites'} element={<Favorites/>}></Route>*/}
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/subcategory/:id'} element={<SubCategory/>}/>
                    <Route path={'/subcategory/:id/goods/:id'} element={<Products/>}/>
                    <Route path={'/personal-area/*'} element={<PersonalArea/>}/>
                    <Route path={'/personal-shop/*'} element={<PersonalShop/>}/>
                </Routes>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
