import {useState} from "react";
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
import {LoadItem} from "../../commonComponent/load_item/LoadItem";


export const DownloadCategory = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    // const success = useAppSelector<string>(state => state.app.success)
    const categories = useAppSelector<CategoryType[]>(state => state.categories.categories)

    // const [file, setFile] = useState<File>()
    // const [preview, setPreview] = useState<string | undefined>()
    // const [categoryTitle, setCategoryTitle] = useState<string>('')

    // useEffect(() => {
    //     if (!file) {
    //         setPreview(undefined)
    //         return
    //     }
    //     const objUrl = URL.createObjectURL(file)
    //     setPreview(objUrl)
    //     return () => URL.revokeObjectURL(objUrl)
    // }, [file])
    // useEffect(()=> {
    //     if(success){
    //         setTimeout(()=>dispatch(setSuccess('')), 2000)
    //     }
    // }, [dispatch, success])

    // const uploadFile = (files: any) => {
    //     const file = files[0]
    //     setFile(file)
    // }
    // const categoryTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setCategoryTitle(e.currentTarget.value)
    // }


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
            <LoadItem thunk={AddCategoryTC}
                      id={userId}
                      success={'категория загружена успешно'}
                      name={'категорию'}
            />

            <>{/*{success&& success}*/}
                {/*<div>*/}
                {/*    <div>{!success ? <div style={{color: "green"}}>{success}</div> :*/}
                {/*        <div style={{opacity: '0'}}>lololo</div>}</div>*/}
                {/*    <div>загругзить категорию</div>*/}
                {/*    <label htmlFor={'uploadFile'} style={{position: 'relative', marginRight: '20px', cursor: 'pointer'}}>*/}

                {/*        <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}*/}
                {/*               id={classCategory["uploadFile"]}/>*/}
                {/*        {file ? <div>{file.name} <img src={preview} alt={'preview'}/></div> : 'выбрать фото'}*/}
                {/*    </label>*/}
                {/*    <input value={categoryTitle} onChange={categoryTitleHandler}/>*/}
                {/*    <</>button onClick={() => addCategory(userId, categoryTitle, file)}> добавить категорию</button>*/}
</>
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