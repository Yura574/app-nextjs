import {Link} from "react-router-dom";
import {useAppDispatch} from "../../../../store/hooks";
import {LogoutTC} from "../../../../store/reducers/auth-reducer";


export const PersonalNavBar = () => {
    return <div>
        <div>
            <div><Link to={'favorites'}>Избранное</Link></div>
            <div><Link to={'orders'}>Заказы</Link></div>
            <div><Link to={'reviews'}>Отзывы</Link></div>
            <div><Link to={'start-selling'}>Начать продавать</Link></div>
            {/*<div onClick={logout}>Выйти</div>*/}
        </div>
    </div>
}
