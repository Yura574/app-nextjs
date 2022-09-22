import {LoadItem} from "../../../commonComponent/load_item/load_item";
import {AddWarehouseTC, getAllWarehousesTC, WarehouseType} from "../../../../store/reducers/warehouse-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect} from "react";
import  classWarehouse from './material_warehouse/materialsWarehouse.module.css'

export const MaterialsWarehouse = () => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)

    useEffect(() => {
        dispatch(getAllWarehousesTC(userId))
    }, [userId, dispatch])
    return (
        <div>
            <div>
                <LoadItem success={''}
                          thunk={AddWarehouseTC}
                          id={userId}
                          name={'склад'}/>
            </div>
            <div>
                {warehouses.map(warehouses => <div key={warehouses.id}>
                    <div>
                        {warehouses.image
                            ? <img src={warehouses.image} alt={'warehouses'}/>
                            : <div className={classWarehouse.image}>{warehouses.title}</div>
                        }
                        // <div>{warehouses.title}</div>
                    </div>
                </div>)}
            </div>
        </div>)
}