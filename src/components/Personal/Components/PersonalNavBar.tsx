import {Link, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {LogoutTC} from "../../../store/reducers/auth-reducer";
import classPersonal from "../personalArea.module.css"


export const PersonalNavBar = () => {
    const dispatch = useAppDispatch()
    const profile = useAppSelector(state => state.profile.profile)

    const logout = () => {
        dispatch(LogoutTC())
    }
    if (!profile.id){
        return <Navigate to={'/'}/>
    }
    return (
            <div className={classPersonal.personalNav}>
                <div><Link to={'favorites'}>Избранное</Link></div>
                <div><Link to={'orders'}>Заказы</Link></div>
                <div><Link to={'reviews'}>Отзывы</Link></div>
                <div><Link to={'start-selling'}>Начать продавать</Link></div>
                <div><Link to={'download-goods'}>Загрузить товары</Link></div>
                <div><Link to={'material-warehouse'}> Склад материалов</Link></div>
                <div><Link to={'finished-products-warehouse'}>Склад готовой продукции</Link></div>
                <div><Link to={'purchases'}>Журнал прихода материалов</Link></div>
                <div onClick={logout}>Выйти</div>
            </div>
    )
}
