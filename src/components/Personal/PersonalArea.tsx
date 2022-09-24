import classCommon from '../../common.module.css';
import classPersonal from './personalArea.module.css'
import { useAppSelector} from "../../store/hooks";
import { Route, Routes, useNavigate} from "react-router-dom";
import {PersonalNavBar} from "./Components/PersonalNavBar";
import {Favorites} from "./Components/Favorites";
import {Orders} from "./Components/Orders";
import {Reviews} from "./Components/Reviews";
import {StartSelling} from "./Components/StartSelling";
import {DownloadCategory} from "./Components/DownloadCategory";
import {MaterialsWarehouse} from "./Components/material_warehouse/Materials_warehouse";
import {Warehouse} from "./Components/material_warehouse/Warehouse";
import {Purchases} from "./Components/Purchases";

export const PersonalArea = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const navigate = useNavigate()

    if (!isAuth) {
       navigate(-1)
    }
    return (

        <div className={classCommon.wrapper}>
            <div className={classPersonal.personalArea}>
                <PersonalNavBar/>
                <div className={classPersonal.container}>
                    <Routes>
                        <Route path={'favorites'} element={<Favorites/>}/>
                        <Route path={'orders'} element={<Orders/>}/>
                        <Route path={'reviews'} element={<Reviews/>}/>
                        <Route path={'start-selling'} element={<StartSelling/>}/>
                        <Route path={'download-goods'} element={<DownloadCategory/>}/>
                        <Route path={'material-warehouse'} element={<MaterialsWarehouse/>}/>
                        <Route path={'material-warehouse/warehouse/:id'} element={<Warehouse/>}/>
                        <Route path={'purchases'} element={<Purchases/>}/>
                    </Routes>
                </div>

            </div>
        </div>
    )
}