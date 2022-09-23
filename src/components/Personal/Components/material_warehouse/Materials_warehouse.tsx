import {LoadItem} from "../../../commonComponent/load_item/load_item";
import {AddWarehouseTC, getAllWarehousesTC, WarehouseType} from "../../../../store/reducers/warehouse-reducer";
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
                        <div>
                            <Link to={`warehouse/${warehouses.id}`}>
                                <div>{warehouses.title}</div>
                            </Link>
                            <div className={classWarehouse.wrapper}>
                                <Link to={`warehouse/${warehouses.id}`}>
                                    <img className={classWarehouse.image}
                                                             src={warehouses.image
                                                                 ? warehouses.image
                                                                 : warehouses.title}
                                                             alt={warehouses.title}/>
                            </Link>
                                <div className={classWarehouse.description}>
                                    <div>кол-во материалов на складе</div>
                                    <div>сумма товаров на складе</div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>)}
            </div>
        </div>)
}