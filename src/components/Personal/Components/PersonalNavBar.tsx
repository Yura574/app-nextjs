import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../store/hooks";
import {LogoutTC} from "../../../store/reducers/auth-reducer";
import classPersonal from "../personalArea.module.css"


export const PersonalNavBar = () => {
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(LogoutTC())
    }
    return (
            <div className={classPersonal.personalNav}>
                <div><Link to={'favorites'}>Избранное</Link></div>
                <div><Link to={'orders'}>Заказы</Link></div>
                <div><Link to={'reviews'}>Отзывы</Link></div>
                <div><Link to={'start-selling'}>Начать продавать</Link></div>
                <div><Link to={'download-goods'}>Загрузить товары</Link></div>
                <div><Link to={'material-warehouse'}> Склад материалов</Link></div>
                <div><Link to={'purchases'}>Закупки</Link></div>
                <div onClick={logout}>Выйти</div>
            </div>
    )
}