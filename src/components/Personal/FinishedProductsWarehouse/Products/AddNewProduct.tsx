import {LoadImage} from "../../../commonComponent/load_image/LoadImage";
import cardClass from "../../../CardProdurt/cardProduct.module.css";
import {IoMdAdd} from "react-icons/io";
import {useEffect, useState} from "react";
import {AddNewProductTC} from "../../../../store/reducers/products-reducer";
import {setCurrentImage, setCurrentWarehouse} from "../../../../store/reducers/currentItems-reducer";
import {MaterialOfProductType} from "./Products";
import {
    AllPurchaseType,
    PurchaseType,
    setAllPurchases,
    setPurchases, WarehousePurchasesTC
} from "../../../../store/reducers/purchases-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {WarehouseType} from "../../../../store/reducers/warehouse-reducer";


type AddNewProductType = {
    addItem: boolean
    setAddItem: (item: boolean)=> void
    id?: string
}

export const AddNewProduct = (props: AddNewProductType) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile.profile.id)
    const warehouses = useAppSelector(state => state.warehouses.warehouses)
    const allPurchases = useAppSelector<AllPurchaseType[]>(state => state.purchases.allPurchases)
    const currentImage = useAppSelector(state => state.currentItems.currentImage)
    const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.currentItems.currentWarehouse)



    const [title, setTitle] = useState<string>('')
    const [addMaterial, setAddMaterial] = useState<boolean>(false)
    const [materialId, setMaterialId] = useState<string>('')
    const [amountOfMaterial, setAmountOfMaterial] = useState<string>('')
    const [priceOfMaterial, setPriceOfMaterial] = useState<string>('')
    const [count, setCount] = useState<number>(1)
    const [totalCost, setTotalCost] = useState<number>(0)
    const [composition, setComposition] = useState<MaterialOfProductType[]>([])



    useEffect(() => {
        setComposition([])
        dispatch(setCurrentImage(null))
        dispatch(setCurrentWarehouse({id: '', title: '', image: ''}))
        dispatch(setPurchases([]))
        setTotalCost(0)
    }, [dispatch])

    useEffect(() => {
        if (currentWarehouse && currentWarehouse.id) dispatch(WarehousePurchasesTC(currentWarehouse.id))
    }, [currentWarehouse, dispatch])


    const addMaterialHandler = (id: string) => {
        setMaterialId(id)
        setAddMaterial(true)
    }
    const addNewProduct = (userId: string, title: string, subCategoryId: string, productComposition: MaterialOfProductType[]) => {
        currentImage
            ? dispatch(AddNewProductTC(userId,title, subCategoryId, count, productComposition, totalCost, currentImage))
            : dispatch(AddNewProductTC(userId, title, subCategoryId, count, productComposition, totalCost))
        setTitle('')
        dispatch(setCurrentImage(null))
        dispatch(setCurrentWarehouse({id: '', title: '', image: ''}))
        props.setAddItem(true)
        setComposition([])
    }
    const changeWarehouse = (warehouse: string) => {
        const newWarehouse = warehouses.find(el => el.title === warehouse)
        newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    }
    const deleteMaterialOfProduct = (materialOfProduct: MaterialOfProductType) => {
        const newComposition = composition.filter(el => el.id !== materialOfProduct.id)
        const total = +(+totalCost - +materialOfProduct.price).toFixed(2)
        setComposition(newComposition)
        dispatch(setAllPurchases(allPurchases.map(el => el.id === materialOfProduct.id
            ? {...el, amount: el.amount && (+el.amount + +materialOfProduct.amount).toString()}
            : el)))
        setTotalCost(total)
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
            const newAmount = (((+exist.amount + +materialOfProduct.amount) * count).toFixed(2)).toString()
            const newPrice = (((+exist.price + +materialOfProduct.price) * count).toFixed(2)).toString()

            setComposition(composition.map(el => el.id === materialOfProduct.id ? {
                ...el,
                amount: newAmount,
                price: newPrice
            } : el))

        } else {
            setComposition([...composition, materialOfProduct])
        }
        dispatch(setAllPurchases(allPurchases.map(el => el.id === materialOfProduct.id
            ? {...el, amount: el.amount && ((+el.amount - (+materialOfProduct.amount * count)).toFixed(2)).toString()}
            : el)))
        setAmountOfMaterial('')
        setPriceOfMaterial('')
        setAddMaterial(false)
        let total = +(+totalCost + +materialOfProduct.price).toFixed(2)

        setTotalCost(total)
    }
    console.log(composition)
    return (
        <div>
            <div>
                <LoadImage/>
                <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                <button onClick={() => composition && addNewProduct(userId,title, props.id ? props.id : '', composition)}>+
                </button>
            </div>
            <div className={cardClass.commonCompositionWrapper}>
                <div className={cardClass.compositionWrapper}>
                    <div>Состав изделия:</div>
                    <div className={cardClass.composition}>
                        {composition?.map((el) => <div key={el.id}>
                            <div>{el.purchaseTitle}  </div>
                            <span>{count > 1 && <span>{count} * </span>} { (+el.amount ).toFixed(2)} </span>
                            <span>{el.unit} </span>
                            <span>{(+el.price * count).toFixed(2)} BYN</span>
                            <button onClick={() => deleteMaterialOfProduct(el)}>x</button>

                        </div>)}

                        {composition.length > 0 ? <div>
                                <div> кол-во: {count}
                                    <button onClick={() => setCount(count + 1)}>+</button>
                                </div>

                                {count > 1
                                    ? <div>себестоимость : {(+totalCost * count).toFixed(2) }BYN ({totalCost}BYN/шт)</div>
                                    : <div>себестоимость : {totalCost.toFixed(2)}</div>
                                }
                            </div>
                            : ''}
                    </div>
                    {composition.length > 0 &&
                        <button onClick={() => props.id && addNewProduct(userId,title, props.id, composition)}>
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


                    {currentWarehouse && allPurchases.map(el => el.warehouseId === currentWarehouse.id
                        ? <div key={el.id} style={{display: 'flex'}}>
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
                                                id: el.id ? el.id : '',
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
                        </div>
                        : ''
                    )}
                </div>
            </div>
        </div>
    )
}