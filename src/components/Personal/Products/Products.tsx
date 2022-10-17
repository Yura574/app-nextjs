import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import cardClass from "../../CardProdurt/cardProduct.module.css";
import {
    AddNewProductTC,
    CompositionType,
    ProductCompositionType,
    SetProductsTC
} from "../../../store/reducers/products-reducer";
import {ProductsType} from "../../../store/reducers/products-reducer";
import {LoadItem} from "../../commonComponent/load_item/load_item_test";
import {GetAllWarehousesTC, WarehouseType} from "../../../store/reducers/warehouse-reducer";
import {setCurrentWarehouse} from "../../../store/reducers/currentItems-reducer";
import {WarehousePurchasesTC} from "../../../store/reducers/purchases-reducer";
import {IoMdAdd} from "react-icons/io";


export const Products = () => {
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const products = useAppSelector<ProductsType[]>(state => state.products.products)
    const warehouses = useAppSelector(state => state.warehouses.warehouses)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.currentItems.currentWarehouse)
    const purchases = useAppSelector(state => state.purchases.purchases)
    const userId = useAppSelector(state => state.profile.profile.id)


    const [title, setTitle] = useState<string>('')
    const [addItem, setAddItem] = useState<boolean>(true)
    const [composition, setComposition] = useState<CompositionType[]>()
    const [addMaterial, setAddMaterial] = useState<boolean>(false)

    useEffect(() => {
        currentWarehouse && dispatch(WarehousePurchasesTC(currentWarehouse.id))
    }, [currentWarehouse, dispatch])

    useEffect(() => {
    dispatch(GetAllWarehousesTC(userId))
    }, [userId])
    useEffect(() => {
        id && dispatch(SetProductsTC(id))
    }, [id, dispatch])
    const addNewProduct = (product: ProductsType, composition: CompositionType[]) => {
        const {title, image} = product
        // const {productId, composition} = composition
        dispatch(AddNewProductTC({title, image}, composition))
    }

    const changeWarehouse = (warehouse: string) => {
        const newWarehouse = warehouses.find(el => el.title === warehouse)
        console.log(newWarehouse)
        newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    }
    return (

        <div>
            {addItem
                ? <div className={cardClass.addItem} onClick={() => setAddItem(false)}>
                    <div className={cardClass.newItem}>+</div>
                    <div>Добавить изделие</div>
                </div>
                : <div>
                    <div>
                        <LoadItem/>
                        <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                        <button onClick={() => composition && addNewProduct({title}, composition)}>+</button>
                    </div>
                    <div className={cardClass.commonCompositionWrapper}>
                        <div className={cardClass.compositionWrapper}>
                            <div>Состав изделия:</div>
                            <div className={cardClass.composition}>
                                {composition?.map(el => <div>{el.purchaseTitle}</div>)}
                            </div>
                        </div>
                        <div className={cardClass.choiceMaterialWrapper}>
                            <select value={currentWarehouse ? currentWarehouse.title : 'выберите склад'}
                                    onChange={(e) => changeWarehouse(e.currentTarget.value)}>
                                <option>укажите склад</option>
                                {warehouses.map(el => <option key={el.id}>{el.title}</option>
                                )}

                            </select>
                            {purchases.map(el => <div style={{display:'flex'}} >
                                <img src={el.image} style={{width:'30px'}}/>
                                <div>{el.title}</div>
                                <div>{el.amount}</div>
                                <div onClick={()=> setAddMaterial(true)}>
                                    {addMaterial
                                        ? <div><input/></div>
                                        :<IoMdAdd/>
                                    }
                                    </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            }
            {products.map(products => {
                const {id, image, title} = products
                return (
                    <div className={cardClass.card} key={id}>
                        <div>{title}</div>
                        <img src={image} className={cardClass.img} alt={'sub category'}/>

                    </div>
                )
            })}
        </div>
    )
}