import s from "./purchases.module.css";
import sEnter from './EnterDataPurchases.module.css'
import {LoadItem} from "../../../commonComponent/load_item/load_item_test";
import {CurrentDate} from "../../../commonComponent/c6-Date/Date";
import {
    CurrentPurchaseType, setCurrentImage,
    setCurrentPurchase,
    setCurrentWarehouse
} from "../../../../store/reducers/currentItems-reducer";
import {MouseEvent, useEffect, useState} from "react";
import {useFormik} from "formik";
import {GetPurchasesInfoTC, PurchasesInfoType} from "../../../../store/reducers/purchasesInfo-reducer";
import {AddPurchasesTC, GetAllPurchasesTC} from "../../../../store/reducers/purchases-reducer";
import {AddWarehouseTC, GetAllWarehousesTC, WarehouseType} from "../../../../store/reducers/warehouse-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {Modal} from "../../../commonComponent/ModalWindow/Modal";


export const EnterDataPurchases = () => {
    const dispatch = useAppDispatch()
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const currentDate = useAppSelector<string>(state => state.currentItems.currentDate)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.currentItems.currentWarehouse)
    const currentImage = useAppSelector<File | undefined>(state => state.currentItems.currentImage)
    let allPurchases = useAppSelector<CurrentPurchaseType[]>(state => state.purchases.allPurchases)
    const currentPurchase = useAppSelector<CurrentPurchaseType>(state => state.currentItems.currentPurchase)


    const [focus, setFocus] = useState<boolean>(false)
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [addNewWarehouse, setAddNewWarehouse] = useState<boolean>(true)


    const formik = useFormik<PurchasesInfoType>({
        initialValues: {
            title: '',
            place: '',
            price: '',
            amount: '',
            unit: '',
        },
        onSubmit: (purchase) => {
            if (currentWarehouse) {
                const unitPrice = +purchase.price / +purchase.amount
                // dispatch(AddPurchasesInfoTC({...purchase}, userId, currentDate))
                dispatch(AddPurchasesTC({...purchase}, userId, currentDate, unitPrice, currentWarehouse?.id, currentImage))
                dispatch(setCurrentImage(null))
                setActiveModal(false)

            } else {
                alert(`не выбран склад материалов`)
            }
        },

        // validationSchema: Yup.object({
        //     userId: Yup.string().required(),
        //     title: Yup.string().required(),
        //     price: Yup.number().required()
        // })
    })
    if (currentImage) setCurrentImage(null)
    useEffect(() => {
        dispatch(GetAllWarehousesTC(userId))
    }, [userId, dispatch])

    useEffect(() => {
        dispatch(GetPurchasesInfoTC(userId))
    }, [userId, dispatch])

    useEffect(() => {
        dispatch(GetAllPurchasesTC(userId))
    }, [userId, dispatch])

    const changeWarehouse = (warehouse: string) => {
        if (warehouse === 'добавить склад') {
            setAddNewWarehouse(true)
            return console.log('new warehouse add')
        }
        const newWarehouse = warehouses.find(el => el.title === warehouse)
        console.log(newWarehouse)
        newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    }
    let goods = []
    for (let i = 0; i < allPurchases.length; i++) {
        if (formik.values.title.length > 0) {
            const n = formik.values.title.length
            if (allPurchases[i].title.slice(0, n) === formik.values.title) {
                goods.push(allPurchases[i])
            }
        }
    }
    const addCurrentPurchase = (e: MouseEvent<HTMLDivElement>, currentPurchase: CurrentPurchaseType) => {
        e.preventDefault()
        dispatch(setCurrentPurchase(currentPurchase))
        console.log(currentPurchase)
        currentPurchase.image && dispatch(setCurrentImage(currentPurchase.image))
        formik.values.title = currentPurchase.title
        setFocus(false)
    }
    const addNewWarehouseHandler = (title: string) => {
        dispatch(AddWarehouseTC(userId, title, 'склад успешно добавлен', currentImage))
        dispatch(setCurrentImage(null))
        setAddNewWarehouse(false)
    }
    const activeModalHandler = () => {
        setActiveModal(true)
        setAddNewWarehouse(false)
        formik.values.title = ''
        dispatch(setCurrentWarehouse(null))

    }


    const inputClick = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFocus(true)
    }
    console.log(formik.values.unit)
    return (
        <div>
            <div className={sEnter.downloadWrapper} onClick={activeModalHandler}>
                <div className={sEnter.download}>+</div>
                <div>добавить закупку</div>
            </div>
            {addNewWarehouse
                ? <Modal activeModal={activeModal} cancel={() => setActiveModal(false)}>
                    <div style={{display: 'flex', padding: '20px'}}>
                        <div style={{width: '200px'}}>
                            {currentPurchase.image
                                ? <img src={currentPurchase.image}
                                       className={` ${s.preview}`} alt={'preview'}/>
                                : <div><LoadItem/></div>
                            }
                            <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                            <button onClick={() => addNewWarehouseHandler(title)}> добавить склад</button>
                            <button onClick={() => setAddNewWarehouse(false)}> отмена</button>
                        </div>
                    </div>
                </Modal>
                : <Modal activeModal={activeModal} cancel={() => setActiveModal(false)}>
                    <div style={{display: 'flex', padding: '20px'}}>
                        <div style={{width: '200px'}}>
                            {currentPurchase.image
                                ? <img src={currentPurchase.image}
                                       className={` ${s.preview}`} alt={'preview'}/>
                                : <div><LoadItem/></div>
                            }
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="title">название товара</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    onChange={formik.handleChange}
                                    // onBlur={()=>setFocus(false)}
                                    value={formik.values.title}
                                    onClick={(e) => inputClick(e)}

                                />
                                {focus && goods.map(el => <div key={el.id} className={s.searchWrapper}
                                                               onClick={(e) => addCurrentPurchase(e, el)}>
                                    <img src={el.image} alt={'img'}/>
                                    <span> {el.title}</span>
                                    <span> {el.price}</span>
                                    <span> {el.amount}</span>
                                    <span> {el.unit}</span>
                                </div>)}
                                {formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}
                                <label htmlFor={'place'}>место покупки</label>
                                <input
                                    id={'place'}
                                    name="place"
                                    type={'text'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.place}
                                />
                                {formik.touched && formik.errors.place ? <div>{formik.errors.place}</div> : null}
                                <label htmlFor={'price'}>цена</label>
                                <input
                                    id={'price'}
                                    name="price"
                                    type={'number'}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price}
                                />
                                {formik.touched && formik.errors.price ? <div>{formik.errors.price}</div> : null}

                                <label htmlFor={"amount"}>количество</label>
                                <input
                                    id={"amount"}
                                    name="amount"
                                    type={"number"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                />
                                {formik.touched && formik.errors.amount ? <div>{formik.errors.amount}</div> : null}

                                <span><label htmlFor="unit">ед изм</label>
                                <select
                                    id={"unit"}
                                    name="unit"

                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.unit}
                                >
                                    <option>шт</option>
                                    <option>гр</option>
                                    <option>кг</option>
                                    <option>мл</option>
                                    <option>л</option>
                                </select>
                                </span>

                                {formik.touched && formik.errors.unit ? <div>{formik.errors.unit}</div> : null}
                                <button type={'submit'}>добавить</button>
                            </form>
                        </div>
                        <div>
                            <select value={currentWarehouse ? currentWarehouse.title : 'выберите склад'}
                                    onChange={(e) => changeWarehouse(e.currentTarget.value)}>
                                <option>укажите склад</option>
                                <option>добавить склад</option>
                                {warehouses.map(el => <option key={el.id}>{el.title}</option>
                                )}
                            </select>
                        </div>
                        <div><CurrentDate/></div>
                    </div>
                </Modal>}

        </div>
    )
}