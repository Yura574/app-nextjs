import SuperInput from "../../../commonComponent/c1-SuperInput/SuperInput";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {getAllWarehousesTC, WarehouseType} from "../../../../store/reducers/warehouse-reducer";
import {CurrentDate} from "../../../commonComponent/c6-Date/Date";
import {AddPurchasesTC, PurchaseType, setCurrentWarehouse} from "../../../../store/reducers/purchases-reducer";
import {LoadItem} from "../../../commonComponent/load_item/LoadItem";
import {LoadItemTest} from "../../../commonComponent/load_item/load_item_test";


export const Purchases = () => {
    const dispatch = useAppDispatch()
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const currentDate = useAppSelector<string>(state => state.date.currentDate)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.purchases.currentWarehouse)
    const currentPurchase = useAppSelector<PurchaseType>(state => state.purchases.currentPurchase)

    const [title, setTitle] = useState<string>('')
    const [place, setPlace] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [amount, setAmount] = useState<number>(0)
    const [unit, setUnit] = useState<string>('')

    // const purchase: PurchaseType = {
    //     warehouseId: currentWarehouse && currentWarehouse.id,
    //     title,
    //     price,
    //     date: currentDate,
    //     place,
    //     amount,
    //     unit,
    //     image
    // }

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
                    <div><LoadItemTest /></div>
                    <SuperInput label={'название товара'} onChangeText={setTitle} value={title}/>
                    <SuperInput label={'место покупки'} onChangeText={setPlace} value={place}/>
                    <SuperInput label={'цена'} onChangeText={setPrice} value={price}/>
                    <SuperInput label={'количество'} onChangeText={setAmount} value={amount}/>
                    <SuperInput label={'ед изм'} onChangeText={setUnit} value={unit}/>


                    {currentWarehouse
                        ? <button onClick={() => addPurchase(currentPurchase)}> добавить </button>
                    :<button disabled> добавить</button>
                    }
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

        </div>
    )
}