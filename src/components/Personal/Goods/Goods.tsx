import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect} from "react";
import {GoodsType, SetGoodsTC} from "../../../store/reducers/goods-reducer";
import {useParams} from "react-router-dom";
import cardClass from "../../CardProdurt/cardProduct.module.css";


export const Goods = () => {
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const goods = useAppSelector<GoodsType[]>(state => state.goods.goods)

    useEffect(()=> {
      id &&  dispatch(SetGoodsTC(id))
    })
    return(
        <div>
            {goods.map(goods => {
                const {id,image,title} = goods
                return (
                    <div className={cardClass.card} key={id}>
                        <div>{title}</div>
                        <img src={image} className={cardClass.img} alt={'category'}/>

                    </div>
                )
            })}
        </div>
    )
}