import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect} from "react";
import { SubCategoriesTC, SubCategoryType} from "../../../store/reducers/subCategory-reducer";
import {useParams} from "react-router-dom";
import {CardProduct} from "../CardProdurt/CardProduct";


export const SubCategory = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const subCategories = useAppSelector<SubCategoryType[]>(state =>state.subCategories.subCategories )

    console.log(id)

    useEffect(() => {
        id && dispatch(SubCategoriesTC(id))
    }, [dispatch, id])

    return (
        <div>
            {subCategories && subCategories.map(sub => {
                return <CardProduct key={sub.id} id={sub.id} title={sub.title} image={sub.image}/>
})}
        </div>
    )
}