import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect} from "react";
import {DownloadCategory} from "../Components/DownloadCategory";
import {CategoryType, GetCategoriesTC} from "../../../store/reducers/categories-reducer";
import cardClass from "../../CardProdurt/cardProduct.module.css";
import {Link} from "react-router-dom";
import classMain from "../../Main/main.module.css";



export const FinishedProductsWarehouse =() => {
    const dispatch = useAppDispatch()
    const category = useAppSelector<CategoryType[]>(state => state.categories.categories)
    const userId = useAppSelector<string>( state => state.profile.profile.id)

    useEffect(() => {
        dispatch(GetCategoriesTC(userId))
    }, [dispatch, userId])
    return (
        <div>
            <div>{category.map(cat => <div className={cardClass.card}>
                <Link to={`subcategory/${cat.id}`} >
                    <div>{cat.title}</div>
                    <img src={cat.image} className={cardClass.img} alt={'category'}/>
                </Link>
            </div>)}</div>

        </div>
    )
}