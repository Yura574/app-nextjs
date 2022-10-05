import SuperInput from "../../../commonComponent/c1-SuperInput/SuperInput";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {getAllWarehousesTC, WarehouseType} from "../../../../store/reducers/warehouse-reducer";
import {CurrentDate} from "../../../commonComponent/c6-Date/Date";
import {AddPurchasesTC, PurchaseType, setCurrentWarehouse} from "../../../../store/reducers/purchases-reducer";
import {LoadItemTest} from "../../../commonComponent/load_item/load_item_test";
import s from './purchases.module.css'
import {AddPurchasesInfoTC, PurchasesInfoType} from "../../../../store/reducers/purchasesInfo-reducer";
import {useFormik} from "formik";
import * as Yup from 'yup'


export const Purchases = () => {
    const dispatch = useAppDispatch()
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const currentDate = useAppSelector<string>(state => state.date.currentDate)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.purchases.currentWarehouse)
    const currentPurchase = useAppSelector<PurchaseType>(state => state.purchases.currentPurchase)

    // const [title, setTitle] = useState<string>('')
    // const [place, setPlace] = useState<string>('')
    // const [price, setPrice] = useState<number>(0)
    // const [amount, setAmount] = useState<number>(0)
    // const [unit, setUnit] = useState<string>('')

    const addPurchaseInfo = (userId: string, title: string, place: string,
                             price: string, amount: string, unit: string, warehouse: string, date: string) => {
        dispatch(AddPurchasesInfoTC({userId, title, place, price, amount, unit, warehouse, date}))
    }

    const formik = useFormik<PurchasesInfoType>({
        initialValues: {
            userId: userId,
            title: '',
            place: '',
            price: '0',
            amount: '0',
            unit: '',
            warehouse: currentWarehouse ? currentWarehouse.id : '',
            date: currentDate,
        },
        onSubmit: (purchaseInfo) => {
            console.log(purchaseInfo)
        },
        validationSchema: Yup.object({
            userId: Yup.string().required(),
            title: Yup.string().required(),
            price: Yup.number().required()
        })

    })
    useEffect(() => {
        if (warehouses.length < 2) {
            dispatch(getAllWarehousesTC(userId))
        }
    }, [userId, warehouses, dispatch])

    const changeWarehouse = (warehouse: string) => {
        const newWarehouse = warehouses.find(el => el.title === warehouse)
        console.log(newWarehouse)
        newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    }


    const addPurchase = (purchase: PurchaseType) => {
        const {warehouseId} = purchase
        if (warehouseId === null || warehouseId === '0') {
            console.log('укажите склад')
        } else {
            dispatch(AddPurchasesTC(purchase))
        }
    }
    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '200px'}}>
                    <div><LoadItemTest/></div>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor={'title'}>название товара</label>
                        <input
                            id={'title'}
                            name="title"
                            type={'text'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        {/*{formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}*/}
                        <label htmlFor={'place'}>место покупки</label>
                        <input
                            id={'place'}
                            name="place"
                            type={'text'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.place}
                        />
                        {/*{formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}*/}
                        <label htmlFor={'price'}>цена</label>
                        <input
                            id={'price'}
                            name="price"
                            type={'text'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                        />
                        {/*{formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}*/}
                        {/*<label htmlFor={"amount"}>количество</label>*/}
                        {/*<input*/}
                        {/*    id={"amount"}*/}
                        {/*    name="amount"*/}
                        {/*    type={"text"}*/}
                        {/*    onChange={formik.handleChange}*/}
                        {/*    onBlur={formik.handleBlur}*/}
                        {/*    value={formik.values.amount}*/}
                        {/*/>*/}
                        {/*{formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}*/}
                        {/*<label htmlFor="unit">ед изм</label>*/}
                        {/*<input*/}
                        {/*    id="unit"*/}
                        {/*    name="unit"*/}
                        {/*    type="text"*/}
                        {/*    onChange={formik.handleChange}*/}
                        {/*    onBlur={formik.handleBlur}*/}
                        {/*    value={formik.values.unit}*/}
                        {/*/>*/}


                        {/*{formik.touched && formik.errors.title ? <div>{formik.errors.title}</div> : null}*/}
                        <button type={'submit'}>добавить12</button>





                    </form>
                    {/*<SuperInput label={'название товара'} onChangeText={setTitle} value={title}/>*/}
                    {/*<SuperInput label={'место покупки'} onChangeText={setPlace} value={place}/>*/}
                    {/*<SuperInput label={'цена'} onChangeText={setPrice} value={price}/>*/}
                    {/*<SuperInput label={'количество'} onChangeText={setAmount} value={amount}/>*/}
                    {/*<SuperInput label={'ед изм'} onChangeText={setUnit} value={unit}/>*/}


                    {/*{currentWarehouse*/}
                    {/*    ? <button onClick={() => addPurchase(currentPurchase)}> добавить </button>*/}
                    {/*    : <button disabled> добавить</button>*/}
                    {/*}*/}
                </div>
                <div>
                    <select value={currentWarehouse ? currentWarehouse.title : 'выберите склад'}
                            onChange={(e) => changeWarehouse(e.currentTarget.value)}>
                        <option>укажите склад</option>
                        {warehouses.map(el => <option key={el.id}>{el.title}</option>
                        )}

                    </select>


                </div>
                <div><CurrentDate/></div>
            </div>
            <hr/>
            <div className={s.wrapper}>
                <div className={s.descriptionWrapper}>
                    <div className={s.descriptionItemWrapper}> Название товара</div>
                    <div className={s.descriptionItemWrapper}>место покупки</div>
                    <div className={s.descriptionItemWrapper}>цена</div>
                    <div className={s.descriptionItemWrapper}>кол-во</div>
                    <div className={s.descriptionItemWrapper}>ед изм</div>
                    <div className={s.descriptionItemWrapper}>склад</div>
                    <div className={s.descriptionItemWrapper}>дата покупки</div>
                </div>
                {[1, 2, 3].map(el =>
                    <div className={s.descriptionWrapper}>
                        <div className={s.descriptionItemWrapper}> {'el.title'}</div>
                        <div className={s.descriptionItemWrapper}>{'el.place'}</div>
                        <div className={s.descriptionItemWrapper}>{'el.price'}</div>
                        <div className={s.descriptionItemWrapper}>{'el.amount'}</div>
                        <div className={s.descriptionItemWrapper}>{'el.unit'}</div>
                        <div className={s.descriptionItemWrapper}>{'el.warehouse'}</div>
                        <div className={s.descriptionItemWrapper}>{'el.date'}</div>
                    </div>)}
            </div>
        </div>
    )
}