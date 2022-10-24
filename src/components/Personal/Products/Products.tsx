import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import cardClass from "../../CardProdurt/cardProduct.module.css";
import {
    AddNewProductTC,
     DeleteProductTC,
    SetProductsTC
} from "../../../store/reducers/products-reducer";
import {ProductsType} from "../../../store/reducers/products-reducer";
import {LoadItem} from "../../commonComponent/load_item/load_item_test";
import {GetAllWarehousesTC, WarehouseType} from "../../../store/reducers/warehouse-reducer";
import {setCurrentWarehouse} from "../../../store/reducers/currentItems-reducer";
import {WarehousePurchasesTC} from "../../../store/reducers/purchases-reducer";
import {IoMdAdd} from "react-icons/io";

export type MaterialOfProductType = {
    warehouseId: string | null,
    purchaseTitle: string,
    amount: string,
    unit: string,
    price: string
}


export const Products = () => {
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const products = useAppSelector<ProductsType[]>(state => state.products.products)
    const warehouses = useAppSelector(state => state.warehouses.warehouses)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.currentItems.currentWarehouse)
    const purchases = useAppSelector(state => state.purchases.purchases)
    const userId = useAppSelector(state => state.profile.profile.id)
    const currentImage = useAppSelector(state => state.currentItems.currentImage)


    const [title, setTitle] = useState<string>('')
    const [addItem, setAddItem] = useState<boolean>(true)
    const [composition, setComposition] = useState<MaterialOfProductType[]>([])
    const [addMaterial, setAddMaterial] = useState<boolean>(false)
    const [materialId, setMaterialId] = useState<string>('')
    const [amountOfMaterial, setAmountOfMaterial] = useState<string>('')
    const [priceOfMaterial, setPriceOfMaterial] = useState<string>('')
    const [totalCost, setTotalCost] = useState<string>('')

    useEffect(() => {
        currentWarehouse && dispatch(WarehousePurchasesTC(currentWarehouse.id))
    }, [currentWarehouse, dispatch])
    useEffect(() => {
        dispatch(GetAllWarehousesTC(userId))
    }, [userId, dispatch])
    useEffect(() => {
        id && dispatch(SetProductsTC(id))
    }, [id, dispatch])

    const addNewProduct = (title: string, subCategoryId: string, productComposition: MaterialOfProductType[]) => {
        currentImage
            ? dispatch(AddNewProductTC(title, subCategoryId, productComposition, currentImage))
            : dispatch(AddNewProductTC(title, subCategoryId, productComposition))
    }

    const changeWarehouse = (warehouse: string) => {
        const newWarehouse = warehouses.find(el => el.title === warehouse)
        newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    }
    const addMaterialHandler = (id: string) => {
        setMaterialId(id)
        setAddMaterial(true)
    }
    const addProduct = (materialOfProduct: MaterialOfProductType) => {
        setComposition([materialOfProduct, ...composition])
        let total = (+totalCost + +materialOfProduct.price).toString()

        setTotalCost(total)
    }
    const deleteProductHandler = (id: string) => dispatch(DeleteProductTC(id))
    console.log(composition)
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
                        {/*<button onClick={() => composition && addNewProduct({title}, composition)}>+</button>*/}
                    </div>
                    <div className={cardClass.commonCompositionWrapper}>
                        <div className={cardClass.compositionWrapper}>
                            <div>Состав изделия:</div>
                            <div className={cardClass.composition}>
                                {composition?.map(el => <div>
                                    <div>{el.purchaseTitle} </div>
                                    <span>{el.amount} </span>
                                    <span>{el.unit} </span>
                                    <span>{el.price} BYN</span>

                                </div>)}
                                <span>себестоимость: {totalCost}</span>
                            </div>
                            {composition.length > 0 &&
                                <button onClick={() => id && addNewProduct(title, id, composition)}>
                                    добавить изделие на склад
                                </button>}
                        </div>
                        <div className={cardClass.choiceMaterialWrapper}>
                            <div>Материалы на складе:</div>
                            <select value={currentWarehouse ? currentWarehouse.title : 'выберите склад'}
                                    onChange={(e) => changeWarehouse(e.currentTarget.value)}>
                                <option>укажите склад</option>
                                {warehouses.map(el => <option key={el.id}>{el.title}</option>
                                )}

                            </select>
                            {purchases.map(el => <div style={{display: 'flex'}}>
                                <img src={el.image} style={{width: '30px'}} alt={el.title}/>
                                <div> {el.title} </div>
                                <div> {el.amount} </div>
                                <div> {el.unit} </div>
                                <div> {el.unitPrice} BYN/гр</div>
                                <div>
                                    {addMaterial && el.id === materialId
                                        ? <div>
                                            <input
                                                autoFocus
                                                type={'number'}
                                                value={amountOfMaterial}
                                                onChange={e => {
                                                    setAmountOfMaterial(e.currentTarget.value)
                                                    let price
                                                    if (el.unitPrice) {
                                                        price = (+el.unitPrice * +e.currentTarget.value).toFixed(2)

                                                    }
                                                    if (price) {

                                                        setPriceOfMaterial(price.toString())
                                                    }
                                                }}

                                            />
                                            <button onClick={() => el.amount && el.unit && el.price &&
                                                addProduct({
                                                    warehouseId: currentWarehouse && currentWarehouse.id,
                                                    purchaseTitle: el.title,
                                                    amount: amountOfMaterial,
                                                    unit: el.unit,
                                                    price: priceOfMaterial
                                                })}>add
                                            </button>
                                            <button onClick={() => {
                                                setAddMaterial(false)
                                            }}>cancel
                                            </button>

                                        </div>
                                        : <IoMdAdd onClick={() => el.id && addMaterialHandler(el.id)}/>
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
                        <button onClick={() => id && deleteProductHandler(id)}>delete</button>
                        <img src={image} className={cardClass.img} alt={'sub category'}/>

                    </div>
                )
            })}
        </div>
    )
}