import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import {
    AddSubCategoryTC,
    DeleteSubCategoryTC,
    getSubCategoriesTC,
    SubCategoryType
} from "../../../../store/reducers/subCategory-reducer";
import {Link, useParams} from "react-router-dom";
import classMain from "../../../Main/main.module.css";
import cardClass from "../../../CardProdurt/cardProduct.module.css";
import {AiOutlineDelete} from "react-icons/ai";
import {setCurrentImage} from "../../../../store/reducers/currentItems-reducer";
import {LoadImage} from "../../../commonComponent/load_image/LoadImage";


export const SubCategory = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const subCategories = useAppSelector<SubCategoryType[]>(state => state.subCategories.subCategories)
    const currentImage = useAppSelector<File | undefined>(state => state.currentItems.currentImage)

    const [title, setTitle] = useState<string>('')
    useEffect(() => {
        id && dispatch(getSubCategoriesTC(id))
    }, [dispatch, id])

    const addNewSubcategory = (catId: string, title: string, image?: File) => {
        currentImage
            ? dispatch(AddSubCategoryTC(catId, title, image))
            : dispatch(AddSubCategoryTC(catId, title))
    }
    const deleteSubCat = (subCatId: string)=>{
        dispatch(DeleteSubCategoryTC(subCatId))
        dispatch(setCurrentImage(null))
    }
    return (
        <div>
            <div>
                <LoadImage/>
                <input value={title} onChange={(e)=> setTitle(e.currentTarget.value)}/>
                <button onClick={() => id && addNewSubcategory(id, title, currentImage)}>+</button>
            </div>
            <div className={cardClass.title}>Подкатегории</div>
            <div className={cardClass.categoryWrapper}>{subCategories && subCategories.map(sub => {
                return (
                    <div className={cardClass.card} key={sub.id}>
                        <div >{sub.title} <AiOutlineDelete onClick={()=> deleteSubCat(sub.id)}/></div>
                        <Link to={`products/${sub.id}`} className={classMain.categoryWrapper}>
                            <img src={sub.image} className={cardClass.img} alt={'sub category'}/>
                        </Link>
                    </div>

                )
            })}</div>
        </div>
    )
}