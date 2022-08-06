import {Link} from "react-router-dom";
import commonClass from '../../common.module.css'
import headerClass from './header.module.css'
import { useAppSelector} from "../../store/hooks";


export const Header = () => {
    // const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const seller = useAppSelector<string>(state => state.profile.profile.role.value)


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
                            ? <div>
                                {seller === 'seller'
                                ? <Link to={'personal-shop'}>Личный <br/>кабинет</Link>
                                :<Link to={'personal-area'}> Личный <br/>кабинет</Link>}
                            </div>
                            : <div><Link to={'/login'}>Войти</Link></div>
                        }
                        <div>Корзина</div>
                    </nav>
                </div>
            </div>

        </div>
    )
}