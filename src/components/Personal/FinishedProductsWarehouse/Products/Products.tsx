import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import cardClass from "../../../CardProdurt/cardProduct.module.css";
import {
    AddNewProductTC,
    DeleteProductTC,
    SetProductsTC
} from "../../../../store/reducers/products-reducer";
import {ProductsType} from "../../../../store/reducers/products-reducer";
import {GetAllWarehousesTC, WarehouseType} from "../../../../store/reducers/warehouse-reducer";
import {setCurrentImage, setCurrentWarehouse} from "../../../../store/reducers/currentItems-reducer";
import {PurchaseType, setPurchases, WarehousePurchasesTC} from "../../../../store/reducers/purchases-reducer";
import {IoMdAdd} from "react-icons/io";
import {LoadImage} from "../../../commonComponent/load_image/LoadImage";

export type MaterialOfProductType = {
    id: string
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
        setTitle('')
        dispatch(setCurrentImage(null))
        setAddItem(true)
    }

    const changeWarehouse = (warehouse: string) => {
        const newWarehouse = warehouses.find(el => el.title === warehouse)
        newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    }
    const addMaterialHandler = (id: string) => {
        setMaterialId(id)
        setAddMaterial(true)
    }
    const deleteMaterialOfProduct = (id: string) => {
        const newComposition = composition.filter(el => el.id !== id)
        setComposition(newComposition)
    }
    const changeAmountMaterial = (amount: string, el: PurchaseType) => {
        setAmountOfMaterial(amount)
        let price
        if (el.unitPrice) price = (+el.unitPrice * +amount).toFixed(2)
        if (price) setPriceOfMaterial(price.toString())


    }
    const addMaterialOfProduct = (materialOfProduct: MaterialOfProductType) => {
        const exist = composition.find(el => el.id === materialOfProduct.id)
        if (exist) {
            const newAmount = (+exist.amount + +materialOfProduct.amount).toString()
            const newPrice = (+exist.price + +materialOfProduct.price).toString()
            setComposition(composition.map(el => el.id === materialOfProduct.id ? {
                ...el,
                amount: newAmount,
                price: newPrice
            } : el))
        } else {
            setComposition([materialOfProduct, ...composition])
        }
        dispatch(setPurchases(purchases.map(el => el.id === materialOfProduct.id
            ? {...el, amount: el.amount && (+el.amount - +materialOfProduct.amount).toString()}
            : el)))
        setAmountOfMaterial('')
        setPriceOfMaterial('')
        setAddMaterial(false)
        let total = (+totalCost + +materialOfProduct.price).toFixed(2)

        setTotalCost(total)
    }
    const deleteProductHandler = (id: string) => dispatch(DeleteProductTC(id))
    return (

        <div>
            {addItem
                ? <div className={cardClass.addItem} onClick={() => setAddItem(false)}>
                    <div className={cardClass.newItem}>+</div>
                    <div>Добавить изделие</div>
                </div>
                : <div>
                    <div>
                        <LoadImage/>
                        <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                        <button onClick={() => composition && addNewProduct(title, id ? id : '', composition)}>+
                        </button>
                    </div>
                    <div className={cardClass.commonCompositionWrapper}>
                        <div className={cardClass.compositionWrapper}>
                            <div>Состав изделия:</div>
                            <div className={cardClass.composition}>
                                {composition?.map((el) => <div key={el.id}>
                                    <div>{el.purchaseTitle} </div>
                                    <span>{el.amount} </span>
                                    <span>{el.unit} </span>
                                    <span>{el.price} BYN</span>
                                    <button onClick={() => deleteMaterialOfProduct(el.id)}>x</button>

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
                            {purchases.map(el => <div key={el.id} style={{display: 'flex'}}>
                                <img src={el.image} style={{width: '30px'}} alt={el.title}/>
                                <div> {el.title} </div>
                                <div> {el.amount} </div>
                                <div> {el.unit} </div>
                                <div> {el.unitPrice} BYN/{el.unit}</div>
                                <div>
                                    {addMaterial && el.id === materialId
                                        ? <div>
                                            <input
                                                autoFocus
                                                type={'number'}
                                                value={amountOfMaterial}
                                                onChange={e => changeAmountMaterial(e.currentTarget.value, el)}

                                            />
                                            <button onClick={() => el.amount && el.unit && el.price &&
                                                addMaterialOfProduct({
                                                    warehouseId: currentWarehouse && currentWarehouse.id,
                                                    purchaseTitle: el.title,
                                                    amount: amountOfMaterial,
                                                    unit: el.unit,
                                                    price: priceOfMaterial,
                                                    id: el.id ? el.id : ''
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
            <div className={cardClass.cardWrapper}>
                {products.map(products => {
                    const {id, image, title} = products
                    return (
                        <div className={cardClass.card} key={id}>
                            <div>{title}</div>
                            <button onClick={() => id && deleteProductHandler(id)}>delete</button>
                            <img src={image} className={cardClass.img} alt={title}/>


                        </div>
                    )
                })}</div>
        </div>
    )
}