import {Link} from "react-router-dom";
import commonClass from '../../common.module.css'
import headerClass from './header.module.css'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {authApi} from "../../api/api";
import {LogoutTC} from "../../store/reducers/auth-reducer";


export const Header = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)

    const logout = () => {
       dispatch(LogoutTC())
    }
    return (
        <div className={headerClass.wrapper}>
            <div className={commonClass.wrapper}>
                <div className={headerClass.header}>
                    <div className={headerClass.logo}>
                        <Link to={'/'}>Coplasca store</Link>
                    </div>
                    <div>
                        <button>Каталог</button>
                        <input type="text"/>
                        <button>поиск</button>
                    </div>
                    <div>

                    </div>
                    <nav className={headerClass.nav}>
                        <div>Избранное</div>
                        {isAuth
                            ? <div onClick={logout}>Выйти</div>
                            : <div><Link to={'/login'}>Войти</Link></div>
                        }
                        <div>Корзина</div>
                    </nav>
                </div>
            </div>

        </div>
    )
}