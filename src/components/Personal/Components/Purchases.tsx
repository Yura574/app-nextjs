import SuperInput from "../../commonComponent/c1-SuperInput/SuperInput";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import { getAllWarehousesTC, WarehouseType} from "../../../store/reducers/warehouse-reducer";
import {InputDate} from "../../commonComponent/c5-InputDate/InputDate";


export const Purchases = () => {
    const dispatch = useAppDispatch()
    const warehouses = useAppSelector<WarehouseType[]>( state => state.warehouses.warehouses)
    const userId = useAppSelector<string>(state => state.profile.profile.id)

    const [title, setTitle] = useState<string>('')
    const [place, setPlace] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    // const [date, setDate] = useState<string>('')
    const[select, setSelect] = useState( '9')
    useEffect(()=>{
        if(warehouses.length< 1){
            dispatch(getAllWarehousesTC(userId))
        }
    })
    const addPurchase = () => {

    }
    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{width: '200px'}}>
                    <SuperInput label={'название товара'} onChangeText={setTitle} value={title}/>
                    <SuperInput label={'место покупки'} onChangeText={setPlace} value={place}/>
                    <SuperInput label={'цена'} onChangeText={setPrice} value={price}/>

                    <button> добавить</button>
                </div>
                <div>
                    <select value={select} onChange={(e)=>setSelect(e.currentTarget.value)}>
                        {warehouses.map(el => <option  key={el.id}>{el.title}</option>
                        )}

                    </select>
                    <button onClick={addPurchase}> click</button>

                </div>

            </div>
        </div>
    )
}