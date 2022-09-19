import {CardProduct} from "../CardProdurt/CardProduct";
import plasterClass from './plasterDecor.module.css'
import {Link} from "react-router-dom";

export const PlasterDecor = () => {
    return(
        <div>
            <div>Гипсовый декор</div>
            <div className={plasterClass.sliderWrapper}>
                {/*<Link to={''}><CardProduct/></Link>*/}
                {/*<Link to={''}><CardProduct/></Link>*/}
                {/*<Link to={''}><CardProduct/></Link>*/}
                {/*<Link to={''}><CardProduct/></Link>*/}
            </div>
        </div>
    )
}