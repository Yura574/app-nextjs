import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect, useState} from "react";
import {
    AddCategoryTC,
    CategoryType,
    DeleteCategoryTC,
    GetCategoriesTC
} from "../../../store/reducers/categories-reducer";
import cardClass from "../../CardProdurt/cardProduct.module.css";
import {Link} from "react-router-dom";
import {setCurrentImage} from "../../../store/reducers/currentItems-reducer";
import {AiFillDelete} from "react-icons/ai";
import {LoadImage} from "../../commonComponent/load_image/LoadImage";


export const FinishedProductsWarehouse = () => {
    const dispatch = useAppDispatch()
    const category = useAppSelector<CategoryType[]>(state => state.categories.categories)
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const currentImage = useAppSelector<File | undefined>(state => state.currentItems.currentImage)

    const [title, setTitle] = useState<string>('')
    useEffect(() => {
        dispatch(GetCategoriesTC(userId))
    }, [dispatch, userId])

    const addNewCategory = (userId: string, title: string, success: string, image?: File) => {
        currentImage
            ? dispatch(AddCategoryTC(userId, title, success, image))
            : dispatch(AddCategoryTC(userId, title, success))
        dispatch(setCurrentImage(null))
    }
    const deleteCat = (categoryId: string) => {
        dispatch(DeleteCategoryTC(categoryId))
    }
    return (
        <div>
            <div>
                <LoadImage/>
                <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={() => addNewCategory(userId, title, '', currentImage)}>+</button>
            </div>
            <div className={cardClass.title}>Категории</div>
            <div className={cardClass.categoryWrapper}>{category.map(cat => <div className={cardClass.card} key={cat.id}>
                <div>{cat.title}
                    <button onClick={() => deleteCat(cat.id)}><AiFillDelete/></button>
                </div>
                <Link to={`subcategory/${cat.id}`}>
                    <img src={cat.image} className={cardClass.img} alt={'category'}/>
                </Link>
            </div>)}</div>

        </div>
    )
}