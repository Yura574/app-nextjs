import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {setSuccess} from "../../../store/reducers/app-reducer";
import classCategory from "../../Personal/Components/downloadCategory.module.css";
import {AddCategoryTC} from "../../../store/reducers/categories-reducer";

type LoadItemType = {
    thunk: any,
    id: string
    success: string
}

export const LoadItem = (props: LoadItemType) => {
    const dispatch = useAppDispatch()
    const success = useAppSelector<string>(state => state.app.success)


    const [file, setFile] = useState<File>()
    const [preview, setPreview] = useState<string | undefined>()
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }
        const objUrl = URL.createObjectURL(file)
        setPreview(objUrl)
        return () => URL.revokeObjectURL(objUrl)
    }, [file])

    useEffect(() => {
        if (success) {
            setTimeout(() => dispatch(setSuccess('')), 2000)
        }
    }, [dispatch, success])

    const uploadFile = (files: any) => {
        const file = files[0]
        setFile(file)
    }
    const titleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItem = (thunk: any, userId: string, itemTitle: string, file: any) => {
        file ? dispatch(thunk(userId, itemTitle, props.success, file))
            : dispatch(thunk(userId, itemTitle, props.success))
        setTitle('')
        setFile(undefined)

    }

    return (
        <div>
            {success && success}
            <div>
                <div>{!success ? <div style={{color: "green"}}>{success}</div> :
                    <div style={{opacity: '0'}}>lololo</div>}</div>
            </div>
            <div>
                <label htmlFor={'uploadFile'} style={{position: 'relative', marginRight: '20px', cursor: 'pointer'}}>

                <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}
                       id={classCategory["uploadFile"]}/>
                {file ? <div>{file.name} <img src={preview} alt={'preview'}/></div> : 'выбрать фото'}
            </label>
                <input value={title} onChange={titleHandler}/>
                <button onClick={() => addItem(props.thunk, props.id, title, file)}> добавить категорию</button>

            </div>
        </div>
    )
}