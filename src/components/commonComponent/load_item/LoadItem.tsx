import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {ChangeEvent, useEffect, useState} from "react";
import {setSuccess} from "../../../store/reducers/app-reducer";
import classCategory from "../../Personal/Components/downloadCategory.module.css";

type LoadItemType = {
    thunk: any,
    id: string
    success: string
    name: string
}

export const LoadItem = (props: LoadItemType) => {
    const dispatch = useAppDispatch()
    const success = useAppSelector<string>(state => state.app.success)


    const [file, setFile] = useState<File>()
    const [preview, setPreview] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }
        const objUrl = URL.createObjectURL(file)
        setPreview(objUrl)
        // return () => URL.revokeObjectURL(objUrl)
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
    const addItem = (thunk: any, id: string, itemTitle: string, file: any) => {
        file ? dispatch(thunk(id, itemTitle, props.success, file))
            : dispatch(thunk(id, itemTitle, props.success))
        setTitle('')
        setFile(undefined)
        setPreview('')

    }
    const deletePreview = ()=> {
        setFile(undefined)
        // setPreview(del)
        // return () => URL.revokeObjectURL(preview)
    }
    console.log(`preview ${preview}`)
    const del =  () => URL.revokeObjectURL(preview)
    console.log(del);

    return (
        <div>
            {success && success}
            <div>
                <div>{!success ? <div style={{color: "green"}}>{success}</div> :
                    <div style={{opacity: '0'}}>lololo</div>}</div>
            </div>
            <div>
                <label htmlFor={'uploadFile'} style={{position: 'relative'}}>

                <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}
                       id={classCategory["uploadFile"]}/>
                {file ? <div onClick={deletePreview}><button>x</button> {file.name} <img src={preview} alt={'preview'}/></div> : 'выбрать фото'}
            </label>
                <input value={title} onChange={titleHandler}/>
                <button onClick={() => addItem(props.thunk, props.id, title, file)}> добавить {props.name}</button>

            </div>
        </div>
    )
}