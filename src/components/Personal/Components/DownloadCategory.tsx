import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {
    AddCategoryTC,
    CategoryType,
    DeleteCategoryTC,
    UpdateCategoryTC
} from "../../../store/reducers/categories-reducer";
import classCategory from "./downloadCategory.module.css";
import {AiOutlineEdit} from "react-icons/ai";
import {DownloadSubCategory} from "./DownloadSubCategory";
import {LoadItem} from "../../commonComponent/load_item/load_item_test";


export const DownloadCategory = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const categories = useAppSelector<CategoryType[]>(state => state.categories.categories)

    const deleteCategory = (categoryId: string) => {
        dispatch(DeleteCategoryTC(categoryId))
    }


    const updateCategory = (userId: string, title: string, image?: File) => {
        image
            ? dispatch(UpdateCategoryTC(userId, title, image))
            : dispatch(UpdateCategoryTC(userId, title))
    }

    return (
        <div>
            <LoadItem/>

            <div className={classCategory.box}>
                {categories.map(cat => {
                        return <div key={cat.id} className={classCategory.container}>
                            <div className={classCategory.header}>
                                <div>{cat.title}</div>
                                <div onClick={() => updateCategory(cat.id, cat.title)}
                                     className={classCategory.edit}><AiOutlineEdit/></div>
                                <div className={classCategory.delete} onClick={() => deleteCategory(cat.id)}>x</div>
                            </div>
                            {cat.image
                                ? <img src={cat.image} className={classCategory.img} alt={'category'}/>
                                :
                                <div className={classCategory.noImg}>{cat.title}</div>
                            }
                            <DownloadSubCategory catId={cat.id}/>
                        </div>
                    }
                )}
            </div>


            <div>загругзить товар</div>
        </div>
    )
}