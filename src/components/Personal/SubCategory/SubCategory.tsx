import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect} from "react";
import {getSubCategoriesTC, SubCategoryType} from "../../../store/reducers/subCategory-reducer";
import {Link, useParams} from "react-router-dom";
import classMain from "../../Main/main.module.css";
import cardClass from "../../CardProdurt/cardProduct.module.css";


export const SubCategory = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const subCategories = useAppSelector<SubCategoryType[]>(state => state.subCategories.subCategories)



    useEffect(() => {
        id && dispatch(getSubCategoriesTC(id))
    }, [dispatch, id])

    return (
        <div>
            {subCategories && subCategories.map(sub => {
                return <Link to={`goods/${sub.id}`} className={classMain.categoryWrapper}>
                    <div className={cardClass.card}>
                        <div>{sub.title}</div>
                        <img src={sub.image} className={cardClass.img} alt={'sub category'}/>
                    </div>
                </Link>
            })}
        </div>
    )
}