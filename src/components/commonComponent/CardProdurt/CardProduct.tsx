import cardClass from './cardProduct.module.css'
import makesy1 from './../../../assest/svg/makesy-1.webp'


export const CardProduct = () => {
    return (
        <div className={cardClass.card}>
            <img src={makesy1} className={cardClass.img}/>
            <div>Декор</div>
            <div>30p</div>
        </div>
    )
}