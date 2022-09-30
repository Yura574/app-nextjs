import SuperInput from "../../commonComponent/c1-SuperInput/SuperInput";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {getAllWarehousesTC, WarehouseType} from "../../../store/reducers/warehouse-reducer";
import {CurrentDate} from "../../commonComponent/c6-Date/Date";
import {AddPurchasesTC, setCurrentWarehouse} from "../../../store/reducers/purchases-reducer";


export const Purchases = () => {
    const dispatch = useAppDispatch()
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const currentDate = useAppSelector<string>(state => state.date.currentDate)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.purchases.currentWarehouse)

    const [title, setTitle] = useState<string>('')
    const [place, setPlace] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [unit, setUnit] = useState<string>('')

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

    // const warehouseId = (title: string) => {
    //     const warehouse = warehouses.find(el => el.title === title)
    //     return warehouse && warehouse.id
    // }

    const addPurchase = (warehouseId: string | null, title: string, date: string, price?: number, place?: string, amount?: number, unit?: string) => {
        if (warehouseId === null || warehouseId === '0') {
            console.log('укажите склад')
        } else {
            dispatch(AddPurchasesTC(warehouseId, title, date, price, place, amount, unit))
        }
    }
    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '200px'}}>
                    <SuperInput label={'название товара'} onChangeText={setTitle} value={title}/>
                    <SuperInput label={'место покупки'} onChangeText={setPlace} value={place}/>
                    <SuperInput label={'цена'} onChangeText={setPrice} value={price}/>
                    <SuperInput label={'количество'} onChangeText={setAmount} value={amount}/>
                    <SuperInput label={'ед изм'} onChangeText={setUnit} value={unit}/>

                    <button
                        onClick={() => addPurchase(currentWarehouse && currentWarehouse.id, title,
                            currentDate, price, place, amount, unit)}> добавить
                    </button>
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
            <br/>
        </div>
    )
}