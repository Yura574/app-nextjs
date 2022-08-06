import React, {useEffect} from 'react';
import {Header} from "./components/header/Header";
import {Main} from "./components/Main/Main";
import {Footer} from "./components/Footer";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/commonComponent/login/Login";
import {AuthMeTC} from "./store/reducers/profile-reducer";
import {Registration} from "./components/commonComponent/login/Registration";
import {SubCategory} from "./components/commonComponent/SubCategory/SubCategory";
import {PersonalArea} from "./components/commonComponent/Personal/PersonalArea";
import {PersonalShop} from "./components/commonComponent/Personal/PersonalShop";
import {Goods} from "./components/commonComponent/Goods/Goods";

function App() {
    const initialized = useAppSelector<boolean>(state => state.auth.initialized)
    const dispatch = useAppDispatch()

    useEffect(()=> {
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
                    <Route path={'/registration'} element={<Registration />}/>
                    <Route path={'/subcategory/:id'} element={<SubCategory />}/>
                    <Route path={'/subcategory/:id/goods/:id'} element={<Goods/>}/>
                    <Route path={'/personal-area/*'} element={<PersonalArea/>} />
                    <Route path={'/personal-shop'} element={<PersonalShop/>} />
                </Routes>
                <Footer/>
            </div>

        </div>
    );
}

export default App;
