import classCommon from '../../../common.module.css';
import classPersonal from './personalArea.module.css'
import {Route, Routes} from "react-router-dom";
import {Favorites} from "./Components/Favorites";
import {Reviews} from "./Components/Reviews";
import {StartSelling} from "./Components/StartSelling";
import {Orders} from "./Components/Orders";
import {PersonalNavBar} from "./Components/PersonalNavBar";


export const PersonalArea = () => {


    return (
        <div className={classCommon.wrapper}>
            <div className={classPersonal.personalArea}>
                <PersonalNavBar/>
                <div>
                    <Routes>
                        <Route path={'favorites'} element={<Favorites/>}></Route>
                        <Route path={'orders'} element={<Orders/>}></Route>
                        <Route path={'reviews'} element={<Reviews/>}></Route>
                        <Route path={'start-selling'} element={<StartSelling/>}> </Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}