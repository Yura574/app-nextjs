import classCategory from "./downloadCategory.module.css";
import {AiOutlineEdit} from "react-icons/ai";
import {AddCategoryTC} from "../../../../store/reducers/categories-reducer";
import {ChangeEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {addSubCategoryTC, SubCategoryType} from "../../../../store/reducers/subCategory-reducer";

export const DownloadSubCategory = (props: {catId: string}) => {
    const dispatch = useAppDispatch()
    const subCategories = useAppSelector<SubCategoryType[]>(state => state.subCategories.subCategories)
    const userId = useAppSelector<string>(state => state.profile.profile.id)


    const [subCategoryTitle, setSubCategoryTitle] = useState<string>('')
    const [file, setFile] = useState<File>()

    const addSubCategory = (catId: string, title: string, file: any) => {
        file ? dispatch(addSubCategoryTC( catId, title, file))
            : dispatch(addSubCategoryTC( catId, title))
        setSubCategoryTitle('')
    }
    const subCategoryTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSubCategoryTitle(e.currentTarget.value)
    }
    const uploadFile = (files: any) => {
        const file = files[0]
        setFile(file)
    }

    const updateSubCategory = (subCatId: string, title: string, file?: File) => {

    }

    const deleteSubCategory = (subCatId: string) => {

    }

    return (
        <div>
            <div>загругзить подкатегорию</div>
            <input type={"file"} onChange={(e) => uploadFile(e.currentTarget.files)}/>
            <input value={subCategoryTitle} onChange={subCategoryTitleHandler}/>
            <button onClick={() => addSubCategory(props.catId, subCategoryTitle, file)}> добавить подкатегорию</button>
            <div className={classCategory.boxSub}>
                {subCategories.map(subCat => {
                        return <div key={subCat.catId} className={classCategory.container}>
                            <div className={classCategory.header}>
                                <div>{subCat.title}</div>
                                <div onClick={() => updateSubCategory(subCat.catId, subCat.title, file)}
                                     className={classCategory.edit}><AiOutlineEdit/></div>
                                <div className={classCategory.delete} onClick={() => deleteSubCategory(subCat.catId)}>x</div>
                            </div>
                            {subCat.image
                                ? <img src={subCat.image} className={classCategory.img} alt={'category'}/>
                                : <div className={classCategory.noImg}>{subCat.title}</div>
                            }
                        </div>
                    }
                )}
            </div>
        </div>
    )
}