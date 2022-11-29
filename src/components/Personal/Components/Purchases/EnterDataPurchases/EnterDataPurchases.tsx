import s from "../purchases.module.css";
import sEnter from './EnterDataPurchases.module.css'
import {CurrentDate} from "../../../../commonComponent/c6-Date/Date";
import {
    CurrentPurchaseType, setCreatedTitleWarehouse, setCurrentDate, setCurrentImage,
    setCurrentPurchase,
    setCurrentWarehouse
} from "../../../../../store/reducers/currentItems-reducer";
import {MouseEvent, useEffect, useState} from "react";
import {useFormik} from "formik";
import {GetPurchasesInfoTC, PurchasesInfoType} from "../../../../../store/reducers/purchasesInfo-reducer";
import {AddPurchasesTC, GetAllPurchasesTC} from "../../../../../store/reducers/purchases-reducer";
import {AddWarehouseTC, GetAllWarehousesTC, WarehouseType} from "../../../../../store/reducers/warehouse-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {Modal} from "../../../../commonComponent/ModalWindow/Modal";
import {LoadImage} from "../../../../commonComponent/load_image/LoadImage";
import {DownloadItem} from "../../../../commonComponent/DownloadItem/DownloadItem";
import {WriteOffMoney} from "./WriteOffMoney/WriteOffMoney";
import {clearWriteOff} from "../../../../../store/reducers/writeOffMoney-reducer";
import {GetAccountsTC} from "../../../../../store/reducers/accounts-reducer";


export const EnterDataPurchases = () => {
    const dispatch = useAppDispatch()
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const currentDate = useAppSelector<string>(state => state.currentItems.currentDate)
    const newDate = useAppSelector<Date>(state => state.date.date)
    const titleWarehouse = useAppSelector(state => state.currentItems.createdTitleWarehouse)
    const currentImage = useAppSelector<File | undefined>(state => state.currentItems.currentImage)
    let allPurchases = useAppSelector<CurrentPurchaseType[]>(state => state.purchases.allPurchases)
    const currentPurchase = useAppSelector<CurrentPurchaseType>(state => state.currentItems.currentPurchase)
    const currentWarehouse = useAppSelector(state => state.currentItems.currentWarehouse)
    const writeOff = useAppSelector(state => state.writeOffMoney)


    const [focus, setFocus] = useState<boolean>(false)
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [addNewWarehouse, setAddNewWarehouse] = useState<boolean>(true)
    const [enable, setEnable] = useState(false)
    const [isInvest, setIsInvest] = useState(false)
    const [error, setError] = useState<string>('')
    const [isDuty, setIsDuty] = useState<boolean>(false)

    const formik = useFormik<PurchasesInfoType>({
        initialValues: {
            userId: userId,
            title: '',
            place: '',
            price: '',
            amount: '',
            unit: '',
            warehouse: '',
            date: currentDate,
            warehouseId: ''
        },
        onSubmit: (purchase) => {
            if (purchase.warehouse && enable) {
                const unitPrice = (+purchase.price / +purchase.amount).toFixed(2)
                dispatch(AddPurchasesTC({...purchase}, unitPrice, writeOff, currentImage))
                dispatch(setCurrentImage(null))
                dispatch(setCurrentPurchase({
                    id: '',
                    title: '',
                    price: '',
                    place: '',
                    amount: '',
                    unit: '',
                    image: '',
                    warehouseId: '',
                    date: ''
                }))
                dispatch(setCurrentWarehouse({id: '', title: '', image: ''}))
                setActiveModal(false)
                formik.values.place = ''
                formik.values.amount = ''
                formik.values.price = ''
                formik.values.warehouse = ''
                setIsInvest(false)
                setError('')
                setIsDuty(false)
                dispatch(clearWriteOff())
            } else {
                if (!enable) {
                    alert('сумма списания со счета не соотвествует цена товара')
                } else {

                    alert(`не выбран склад материалов`)
                }
            }
        },

        // validationSchema: Yup.object({
        //     userId: Yup.string().required(),
        //     title: Yup.string().required(),
        //     price: Yup.number().required()
        // })
    })

    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const day = newDate.getDate()


    useEffect(() => {
        dispatch(setCurrentDate(`${day}/${month + 1}/${year}`))
    }, [dispatch, year, month, day])
    useEffect(() => {
        formik.values.date = currentDate
    }, [dispatch, currentDate, formik.values])
    useEffect(() => {
        if (currentWarehouse) {
            formik.values.warehouse = currentWarehouse.title
            formik.values.warehouseId = currentWarehouse.id
        }
    }, [dispatch, currentWarehouse, formik.values])
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
        dispatch(setCreatedTitleWarehouse(''))
        if (warehouse === 'добавить склад') {
            if (currentImage) dispatch(setCurrentImage(undefined))
            setAddNewWarehouse(true)
        }
        const newWarehouse = warehouses.find(el => el.title === warehouse)
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
    const addCurrentPurchase = (currentPurchase: CurrentPurchaseType) => {
        dispatch(setCurrentPurchase(currentPurchase))
        currentPurchase.image && dispatch(setCurrentImage(currentPurchase.image))
        formik.values.title = currentPurchase.title
        formik.values.unit = currentPurchase.unit
        const warehouse = warehouses.find(el => el.id === currentPurchase.warehouseId)
        if (warehouse) formik.values.warehouse = warehouse.title
        setFocus(false)
    }
    const addNewWarehouseHandler = (title: string) => {
        dispatch(AddWarehouseTC(userId, title, 'склад успешно добавлен', currentImage))
        dispatch(setCreatedTitleWarehouse(title))
        dispatch(setCurrentImage(null))
        setAddNewWarehouse(false)
        setTitle('')
    }
    const cancelAddWarehouseHandler = () => {
        if (currentImage) dispatch(setCurrentImage(undefined))
        setAddNewWarehouse(false)
        setTitle('')
    }
    const activeModalHandler = () => {
        setActiveModal(true)
        setAddNewWarehouse(false)
        formik.values.title = ''
        dispatch(setCurrentWarehouse(null))

    }
    const closeModal = () => {
        dispatch(setCurrentPurchase({
            id: '',
            title: '',
            price: '',
            place: '',
            amount: '',
            unit: '',
            image: '',
            warehouseId: '',
            date: ''
        }))
        if (currentImage) dispatch(setCurrentImage(null))
        setActiveModal(false)
        setIsInvest(false)
        setError('')
        setIsDuty(false)
        dispatch(setCurrentWarehouse({id: '', title: '', image: ''}))
        dispatch(clearWriteOff())
        dispatch(GetAccountsTC(userId))
        formik.values.warehouse = ''
    }


    const inputClick = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFocus(true)
    }
    return (
        <div>
            <div className={sEnter.downloadWrapper} onClick={activeModalHandler}>
                <div className={sEnter.download}>+</div>
                <div>добавить закупку</div>
            </div>
            {addNewWarehouse
                ? <DownloadItem title={title} setTitle={setTitle} activeModal={activeModal}
                                currentPurchase={currentPurchase} cancelAddWarehouseHandler={cancelAddWarehouseHandler}
                                addItemHandler={addNewWarehouseHandler}/>
                : <Modal activeModal={activeModal}>
                    <div style={{padding: '20px'}}>
                        <div>
                            {currentPurchase.image
                                ? <img src={currentPurchase.image}
                                       className={` ${s.preview}`} alt={'preview'}/>
                                : <div><LoadImage/></div>
                            }
                            <div>
                                <select value={titleWarehouse
                                    ? titleWarehouse
                                    : currentWarehouse ? currentWarehouse.title : 'выберите склад'}
                                        onChange={(e) => changeWarehouse(e.currentTarget.value)}>
                                    <option>укажите склад</option>
                                    <option>добавить склад</option>
                                    {warehouses.map(el => <option key={el.id}>{el.title}</option>
                                    )}
                                </select>
                            </div>
                            <div><CurrentDate/></div>
                            <div style={{display: 'flex'}}>
                                <form onSubmit={formik.handleSubmit}>
                                    <label htmlFor="title">название товара</label>
                                    <div><input
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={formik.handleChange}
                                        // onBlur={()=>setFocus(false)}
                                        value={formik.values.title}
                                        onClick={(e) => inputClick(e)}

                                    /></div>
                                    {focus && goods.map(el => <div key={el.id} className={s.searchWrapper}
                                                                   onClick={() => addCurrentPurchase(el)}>
                                        <img src={el.image} alt={'img'}/>
                                        <span> {el.title}</span>
                                        <span> {el.price}</span>
                                        <span> {el.amount}</span>
                                        <span> {el.unit}</span>
                                    </div>)}
                                    {formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}
                                    <label htmlFor={'place'}>место покупки</label>
                                    <div><input
                                        id={'place'}
                                        name="place"
                                        type={'text'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.place}
                                    /></div>
                                    {formik.touched && formik.errors.place ? <div>{formik.errors.place}</div> : null}
                                    <label htmlFor={'price'}>цена</label>
                                    <div><input
                                        id={'price'}
                                        name="price"
                                        type={'text'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                    /><span>BYN</span></div>
                                    {formik.touched && formik.errors.price ? <div>{formik.errors.price}</div> : null}

                                    <label htmlFor={"amount"}>количество</label>
                                    <div><input
                                        id={"amount"}
                                        name="amount"
                                        type={"text"}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.amount}
                                    /></div>
                                    {formik.touched && formik.errors.amount ?
                                        <div>{formik.errors.amount}</div> : null}
                                    <label htmlFor="unit"> ед измерения</label>
                                    <div><select
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
                                        <option>см</option>
                                        <option>м</option>
                                        <option>лист</option>
                                    </select></div>


                                    {formik.touched && formik.errors.unit ? <div>{formik.errors.unit}</div> : null}

                                    <div style={{margin: '20px 0 20px 0'}}>
                                        <button type={'submit'}>добавить</button>
                                        <button type={'button'} onClick={closeModal}> отмена</button>
                                    </div>
                                </form>
                                <div style={{width: '50%'}}>
                                    <WriteOffMoney price={formik.values.price}
                                                   setEnable={setEnable}
                                                   isInvest={isInvest}
                                                   setIsInvest={setIsInvest}
                                                   error={error}
                                                   setError={setError}
                                                   isDuty={isDuty}
                                                   setIsDuty={setIsDuty}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </Modal>}

        </div>
    )
}