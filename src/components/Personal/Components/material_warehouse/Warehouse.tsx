import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {DeletePurchaseTC, PurchaseType, WarehousePurchasesTC} from "../../../../store/reducers/purchases-reducer";
import {useParams} from "react-router-dom";
import classWarehouse from "./materialsWarehouse.module.css";

export const Warehouse = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const purchases = useAppSelector<PurchaseType[]>(state => state.purchases.purchases)

    useEffect(() => {
        id && dispatch(WarehousePurchasesTC(id))
    }, [id, dispatch])

    const deletePurchase = (purchaseId: string) => {
        dispatch(DeletePurchaseTC(purchaseId))
    }
    return (
        <div>
            {purchases.map(purchases => <div key={purchases.id}>
                <div>
                    <div>
                        <div>{purchases.title}</div>
                        <div className={classWarehouse.wrapper}>
                            <img className={classWarehouse.image}
                                 src={purchases.image
                                     ? purchases.image
                                     : purchases.title}
                                 alt={purchases.title}/>

                            <div className={classWarehouse.description}>
                                <button onClick={() => purchases.id&&deletePurchase(purchases.id)}>delete</button>
                            </div>
                        </div>

                    </div>


                </div>
            </div>)}
        </div>
    )
}

