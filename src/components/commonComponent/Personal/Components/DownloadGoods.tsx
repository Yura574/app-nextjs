import {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {AddCategoryTC, CategoryType, DeleteCategoryTC} from "../../../../store/reducers/categories-reducer";
import classCategory from "./downloadGoods.module.css";


export const DownloadGoods = () => {
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

    const deleteCategory = (categoryId: string)=> {
        dispatch(DeleteCategoryTC(categoryId))
    }

    const addGoods = (userId: string, categoryTitle: string, file: any) => {
        console.log(file)
        file ? dispatch(AddCategoryTC(userId, categoryTitle, 'категория загружена успешно', file))
            : dispatch(AddCategoryTC(userId, categoryTitle, 'категория загружена успешно'))
        setCategoryTitle('')
    }
    return (
        <div>
            <div>
                <div>{!success ? <div style={{color: "green"}}>{success}</div> :
                    <div style={{opacity: '0'}}>lololo</div>}</div>
                <div>загругзить категорию</div>

                <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}/>
                <input value={categoryTitle} onChange={categoryTitleHandler}/>
                <button onClick={() => addGoods(userId, categoryTitle, file)}> добавить товар</button>


                <div className={classCategory.box}>
                    {categories.map(cat => {
                            return <div key={cat.id} className={classCategory.container}>
                                <div className={classCategory.header}>
                                    <div>{cat.title}</div>
                                    <div className={classCategory.delete} onClick={()=> deleteCategory(cat.id)}>x</div>
                                </div>
                                <img src={cat.image} className={classCategory.img} alt={'category'}/>
                            </div>
                        }
                    )}
                </div>

            </div>
            <div>загругзить под категорию</div>
            <div>загругзить товар</div>
        </div>
    )
}