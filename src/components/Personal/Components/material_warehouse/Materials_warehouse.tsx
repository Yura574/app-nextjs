import {LoadItem} from "../../../commonComponent/load_item/load_item";
import {
    AddWarehouseTC,
    DeleteWarehouseTC,
    getAllWarehousesTC,
    WarehouseType
} from "../../../../store/reducers/warehouse-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect} from "react";
import classWarehouse from './materialsWarehouse.module.css'
import {Link} from "react-router-dom";

export const MaterialsWarehouse = () => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)

    useEffect(() => {
        dispatch(getAllWarehousesTC(userId))
    }, [userId, dispatch])

    const deleteWarehouse = (warehouseId: string)=> {
        dispatch(DeleteWarehouseTC(warehouseId))
    }
    return (
        <div>
            <div>
                <LoadItem success={'склад добавлен'}
                          thunk={AddWarehouseTC}
                          id={userId}
                          name={'склад'}/>
            </div>
            <div>
                {warehouses.map(warehouse => <div key={warehouse.id}>
                    <div>
                        <div>
                            <Link to={`warehouse/${warehouse.id}`}>
                                <div>{warehouse.title}</div>
                            </Link>
                            <div className={classWarehouse.wrapper}>
                                <Link to={`warehouse/${warehouse.id}`}>
                                    <img className={classWarehouse.image}
                                                             src={warehouse.image
                                                                 ? warehouse.image
                                                                 : warehouse.title}
                                                             alt={warehouse.title}/>
                            </Link>
                                <div className={classWarehouse.description}>
                                    <div>кол-во материалов на складе</div>
                                    <div>сумма товаров на складе</div>
                                    <button onClick={()=>deleteWarehouse(warehouse.id)}>x</button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>)}
            </div>
        </div>)
}