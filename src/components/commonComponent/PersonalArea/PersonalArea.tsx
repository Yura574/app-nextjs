import classCommon from '../../../common.module.css';
import classPersonal from './personalArea.module.css'


export const PersonalArea = () => {

    return (
        <div className={classCommon.wrapper}>
            <div className={classPersonal.personalArea} >
                <div>
                    <div>Избранное</div>
                    <div>Заказы</div>
                    <div>Отзовы</div>
                    <div>Выйти</div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}