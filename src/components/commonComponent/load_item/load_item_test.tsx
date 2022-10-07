import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import { useEffect, useRef, useState} from "react";
import {setSuccess} from "../../../store/reducers/app-reducer";
import classCategory from "../../Personal/Components/downloadCategory.module.css";
import s from './LoadItem.module.css'
import { AiOutlineDelete, AiTwotoneEdit} from "react-icons/ai";
import {setCurrentImage} from "../../../store/reducers/currentItems-reducer";


export const LoadItem= () => {
    const dispatch = useAppDispatch()
    const success = useAppSelector<string>(state => state.app.success)
    const currentImage = useAppSelector<File | undefined>(state => state.currentItems.currentImage)


    // const [file, setFile] = useState<File>()
    const [preview, setPreview] = useState<string>('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!currentImage) {
            setPreview('')
            return
        }
        const objUrl = URL.createObjectURL(currentImage)
        setPreview(objUrl)
    }, [currentImage])

    useEffect(() => {
        if (success) {
            setTimeout(() => dispatch(setSuccess('')), 2000)
        }
    }, [dispatch, success])

    const uploadFile = (files: any) => {
        const file = files[0]
        dispatch(setCurrentImage(file))
    }
    const deletePreview = () => {
        dispatch(setCurrentImage(undefined))
    }

    const changeImage = () => {
        fileInputRef.current?.click()
    }
    return (
        <div>
            {success && success}
            <div>
                <div>{!success ? <div style={{color: "green"}}>{success}</div> :
                    <div style={{opacity: '0'}}>lololo</div>}</div>
            </div>
            <div>
                <label htmlFor={'uploadFile'} style={{position: 'relative'}}>

                    <input type={"file"} ref={fileInputRef} onChange={(e) => uploadFile(e.currentTarget.files)}
                           id={classCategory["uploadFile"]}/>
                    {currentImage
                        ?
                        <div style={{width: '120px'}}>
                            <div className={s.placeForImage} >
                                <img className={`${s.image} ${s.preview}`} src={preview} alt={'preview'}/>
                        </div>
                        <div className={s.buttonWrapper}>
                            <span onClick={changeImage}><AiTwotoneEdit/></span>
                            <span onClick={deletePreview}> <AiOutlineDelete/></span>
                        </div>
                        </div>
                        : <div className={s.placeForImage} onClick={changeImage}>выбрать фото</div>}
                </label>

            </div>
        </div>
    )
}