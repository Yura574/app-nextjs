import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import s from './purchases.module.css'
import {DeletePurchaseInfoTC, GetPurchasesInfoTC, InfoType} from "../../../../store/reducers/purchasesInfo-reducer";
import {EnterDataPurchases} from "./EnterDataPurchases";
import {AiFillDelete, AiTwotoneEdit} from "react-icons/ai";
import {useEffect, useState} from "react";


export const Purchases = () => {
    const dispatch = useAppDispatch()
    const purchasesInfo = useAppSelector<InfoType[]>(state => state.purchasesInfo.purchasesInfo)
    const userId = useAppSelector(state => state.profile.profile.id)

    const [edit, setEdit] = useState<boolean>(false)
    const [id, setId] = useState<string>('')

    useEffect(()=>{
        dispatch(GetPurchasesInfoTC(userId))
    }, [userId, dispatch])

    const handleEdit = (id: string) => {
        setEdit(true)
        setId(id)
    }
    const cancelEdit = () => {
        setEdit(false)
        setId('')
    }

    const sortPurchasesInfo = purchasesInfo.map(obj => {
        const fullDate = obj.date.split('/')
        const year = +fullDate[2]
        const month = +fullDate[1] - 1
        const day = +fullDate[0]
        return {...obj, date: new Date(year, month, day)}
    })
    const sortedAsc = sortPurchasesInfo.sort(
        (objA, objB) => Number(objB.date) - Number(objA.date),
    );
    const finalSort = sortedAsc.map(obj => {
        const year = obj.date.getFullYear()
        const month = obj.date.getMonth()
        const day = obj.date.getDate()
        return {...obj, date: `${day}/${month + 1}/${year}`}
    })

    const deletePurchaseInfo = (id: string) => {
        dispatch(DeletePurchaseInfoTC(id))
    }

    return (
        <div>
            <EnterDataPurchases/>
            <hr/>
            <div className={s.wrapper}>
                <div className={s.descriptionWrapper}>
                    <div className={s.descriptionItemWrapper}> Название товара</div>
                    <div className={s.descriptionItemWrapper}>место покупки</div>
                    <div className={s.descriptionItemWrapper}>цена</div>
                    <div className={s.descriptionItemWrapper}>кол-во</div>
                    <div className={s.descriptionItemWrapper}>цена за еденицу</div>
                    <div className={s.descriptionItemWrapper}>дата покупки</div>
                </div>
                {finalSort.map(el =>
                    <div className={s.descriptionWrapper} key={el.id}>
                        <div className={s.descriptionItemWrapper}>
                            {edit ?? el.id
                                ? <input value={el.title}/>
                                : <>{el.title}</>
                            }
                        </div>
                        <div className={s.descriptionItemWrapper}>
                            {edit && el.id === id
                                ? <input value={el.place}/>
                                : <a href={`https://${el.place}/`}>{el.place}</a>
                            }</div>
                        <div className={s.descriptionItemWrapper}>
                            {edit && el.id === id
                                ? <><input value={el.price}/> BYN</>
                                : <>{el.price}BYN</>
                            }</div>
                        <div className={s.descriptionItemWrapper}>
                            {edit && el.id === id
                                ? <><input value={el.amount}/> <input value={el.unit}/></>
                                : <>{el.amount} {el.unit}</>
                            }</div>
                        <div className={s.descriptionItemWrapper}>{+el.price / +el.amount} BYN/{el.unit}</div>
                        <div className={s.descriptionItemWrapper}>
                            {edit && el.id === id
                                ? <input value={el.date}/>
                                : <>{el.date} </>
                            }
                            {edit && el.id === id
                                ? <>
                                    <button onClick={cancelEdit}>save</button>
                                    <button onClick={cancelEdit}>cancel</button>
                                </>
                                : <>
                                    <button onClick={() => handleEdit(el.id)}><AiTwotoneEdit/></button>
                                    <button onClick={() => deletePurchaseInfo(el.id)}><AiFillDelete/></button>
                                </>
                            }

                        </div>

                    </div>)}
            </div>
        </div>
    )
}