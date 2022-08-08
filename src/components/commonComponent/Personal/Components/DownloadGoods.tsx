import {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {AddCategoryTC} from "../../../../store/reducers/categories-reducer";


export const DownloadGoods = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const success = useAppSelector<string>(state => state.app.success)

    const [file, setFile] = useState<File>()
    const [categoryTitle, setCategoryTitle] = useState<string>('')

    const uploadFile = (files: any) => {
        const file = files[0]
        setFile(file)
    }
    const categoryTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryTitle(e.currentTarget.value)

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
                <div>{!success ? <div style={{color: "green"}}>{success}</div>: <div style={{opacity: '0'}}>lololo</div>}</div>
                <div>загругзить категорию</div>

                <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}/>
                <input value={categoryTitle} onChange={categoryTitleHandler}/>
                <button onClick={() => addGoods(userId, categoryTitle, file)}> добавить товар</button>

            </div>
            <div>загругзить под категорию</div>
            <div>загругзить товар</div>
        </div>
    )
}