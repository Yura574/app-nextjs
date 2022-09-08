import {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
    AddCategoryTC,
    CategoryType,
    DeleteCategoryTC,
    UpdateCategoryTC
} from "../../../../store/reducers/categories-reducer";
import classCategory from "./downloadGoods.module.css";
import {AiOutlineEdit} from "react-icons/ai";
import {SubCategoryType} from "../../../../store/reducers/subCategory-reducer";


export const DownloadGoods = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const success = useAppSelector<string>(state => state.app.success)
    const categories = useAppSelector<CategoryType[]>(state => state.categories.categories)
    const subCategories = useAppSelector<SubCategoryType[]>(state => state.subCategories.subCategories)

    const [file, setFile] = useState<File>()
    const [categoryTitle, setCategoryTitle] = useState<string>('')
    const [subCategoryTitle, setSubCategoryTitle] = useState<string>('')

    const uploadFile = (files: any) => {
        const file = files[0]
        setFile(file)
    }
    const categoryTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryTitle(e.currentTarget.value)
    }

    const subCategoryTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSubCategoryTitle(e.currentTarget.value)
    }

    const deleteCategory = (categoryId: string) => {
        dispatch(DeleteCategoryTC(categoryId))
    }

    const addCategory = (userId: string, categoryTitle: string, file: any) => {
        file ? dispatch(AddCategoryTC(userId, categoryTitle, 'категория загружена успешно', file))
            : dispatch(AddCategoryTC(userId, categoryTitle, 'категория загружена успешно'))
        setCategoryTitle('')
    }
    const updateCategory = (userId: string, title: string, image?: File) => {
        image
            ? dispatch(UpdateCategoryTC(userId, title, image))
            : dispatch(UpdateCategoryTC(userId, title))
    }
    return (
        <div>
            <div>
                <div>{!success ? <div style={{color: "green"}}>{success}</div> :
                    <div style={{opacity: '0'}}>lololo</div>}</div>
                <div>загругзить категорию</div>

                <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}/>
                <input value={categoryTitle} onChange={categoryTitleHandler}/>
                <button onClick={() => addCategory(userId, categoryTitle, file)}> добавить товар</button>
                <div className={classCategory.box}>
                    {categories.map(cat => {
                            return <div key={cat.id} className={classCategory.container}>
                                <div className={classCategory.header}>
                                    <div>{cat.title}</div>
                                    <div onClick={() => updateCategory(cat.id, cat.title, file)}
                                         className={classCategory.edit}><AiOutlineEdit/></div>
                                    <div className={classCategory.delete} onClick={() => deleteCategory(cat.id)}>x</div>
                                </div>
                                {cat.image
                                    ? <img src={cat.image} className={classCategory.img} alt={'category'}/>
                                    :
                                    <div className={classCategory.noImg}>{cat.title}</div>
                                }
                            </div>
                        }
                    )}
                </div>

            </div>
            <div>
                <div>загругзить подкатегорию</div>
                <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}/>
                <input value={subCategoryTitle} onChange={subCategoryTitleHandler}/>
                <button onClick={() => addCategory(userId, categoryTitle, file)}> добавить товар</button>
                <div className={classCategory.box}>
                    {subCategories.map(subCat => {
                            return <div key={subCat.id} className={classCategory.container}>
                                <div className={classCategory.header}>
                                    <div>{subCat.title}</div>
                                    <div onClick={() => updateCategory(subCat.id, subCat.title, file)}
                                         className={classCategory.edit}><AiOutlineEdit/></div>
                                    <div className={classCategory.delete} onClick={() => deleteCategory(subCat.id)}>x</div>
                                </div>
                                {subCat.image
                                    ? <img src={subCat.image} className={classCategory.img} alt={'category'}/>
                                    :
                                    <div className={classCategory.noImg}>{subCat.title}</div>
                                }
                            </div>
                        }
                    )}
                </div>
            </div>
            <div>загругзить товар</div>
        </div>
    )
}