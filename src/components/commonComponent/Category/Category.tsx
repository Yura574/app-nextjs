import cardClass from "../CardProdurt/cardProduct.module.css";
import classMain from "../../Main/main.module.css";
import {Link} from "react-router-dom";

type CardType = {
    id: string
    title: string
    image: string
}
export const Category = (props: CardType) => {
    const {id,image, title} = props

    return (
        <div>
            <Link to={`subcategory/${id}`} className={classMain.categoryWrapper}>
            <div className={cardClass.card}>
                <div>{title}</div>
                <img src={image} className={cardClass.img} alt={'category'}/>

            </div>
            </Link>
        </div>
    )
}