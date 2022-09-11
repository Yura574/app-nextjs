import {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
    AddCategoryTC,
    CategoryType,
    DeleteCategoryTC,
    UpdateCategoryTC
} from "../../../../store/reducers/categories-reducer";
import classCategory from "./downloadCategory.module.css";
import {AiOutlineEdit} from "react-icons/ai";


export const DownloadCategory = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const success = useAppSelector<string>(state => state.app.success)
    const categories = useAppSelector<CategoryType[]>(state => state.categories.categories)

    const [file, setFile] = useState<File>()
    const [categoryTitle, setCategoryTitle] = useState<string>('')


    const uploadFile = (files: any) => {
        const file = files[0]
        setFile(file)
    }
    const categoryTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryTitle(e.currentTarget.value)
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
                <label htmlFor={'uploadFile'} style={{position:'relative', marginRight: '20px', cursor:'pointer'}}>

                    <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)} id={classCategory["uploadFile"]}/>
                    выбрать фото
                </label>
                <input value={categoryTitle} onChange={categoryTitleHandler}/>
                <button onClick={() => addCategory(userId, categoryTitle, file)}> добавить категорию</button>
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

            </div>
            <div>загругзить товар</div>
        </div>
    )
}