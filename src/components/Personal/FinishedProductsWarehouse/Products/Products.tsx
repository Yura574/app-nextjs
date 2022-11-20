import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import cardClass from "../../../CardProdurt/cardProduct.module.css";
import {
    ChangeProductImageTC,
    DeleteProductTC,
    SetProductsTC
} from "../../../../store/reducers/products-reducer";
import {ProductsType} from "../../../../store/reducers/products-reducer";
import {GetAllWarehousesTC} from "../../../../store/reducers/warehouse-reducer";
import {setCurrentImage} from "../../../../store/reducers/currentItems-reducer";
import {GetAllPurchasesTC} from "../../../../store/reducers/purchases-reducer";
import {LoadImage} from "../../../commonComponent/load_image/LoadImage";
import {AddNewProduct} from "./AddNewProduct";

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
    // const warehouses = useAppSelector(state => state.warehouses.warehouses)
    // const currentWarehouse = useAppSelector<WarehouseType | null>(state => state.currentItems.currentWarehouse)
    // const purchases = useAppSelector(state => state.purchases.purchases)
    // const allPurchases = useAppSelector<AllPurchaseType[]>(state => state.purchases.allPurchases)
    const userId = useAppSelector(state => state.profile.profile.id)
    const currentImage = useAppSelector(state => state.currentItems.currentImage)


    // const [title, setTitle] = useState<string>('')
    const [addItem, setAddItem] = useState<boolean>(true)
    // const [composition, setComposition] = useState<MaterialOfProductType[]>([])
    // const [addMaterial, setAddMaterial] = useState<boolean>(false)
    // const [materialId, setMaterialId] = useState<string>('')
    // const [amountOfMaterial, setAmountOfMaterial] = useState<string>('')
    // const [priceOfMaterial, setPriceOfMaterial] = useState<string>('')
    // const [totalCost, setTotalCost] = useState<number>(0)
    const [addPhoto, setAddPhoto] = useState<boolean>(false)
    const [changePhotoId, setChangePhotoId] = useState<string>('')
    const [hoverComposition, setHoverComposition] = useState<boolean>(false)
    const [productId, setProductId] = useState<string>('')
    // const [count, setCount] = useState<number>(1)


    // useEffect(() => {
    //     setComposition([])
    //     dispatch(setCurrentImage(null))
    //     dispatch(setCurrentWarehouse({id: '', title: '', image: ''}))
    //     dispatch(setPurchases([]))
    //     setTotalCost(0)
    // }, [dispatch])
    // useEffect(() => {
    //     if (currentWarehouse && currentWarehouse.id) dispatch(WarehousePurchasesTC(currentWarehouse.id))
    // }, [currentWarehouse, dispatch])
    useEffect(() => {
        dispatch(GetAllWarehousesTC(userId))
    }, [userId, dispatch])
    useEffect(() => {
        id && dispatch(SetProductsTC(id))
    }, [id, dispatch])
    useEffect(() => {
        dispatch(GetAllPurchasesTC(userId))
    }, [userId, dispatch])


    // const addNewProduct = (userId: string, title: string, subCategoryId: string, productComposition: MaterialOfProductType[]) => {
    //     console.log(userId)
    //     currentImage
    //         ? dispatch(AddNewProductTC(userId,title, subCategoryId, count, productComposition, totalCost, currentImage))
    //         : dispatch(AddNewProductTC(userId, title, subCategoryId, count, productComposition, totalCost))
    //     setTitle('')
    //     dispatch(setCurrentImage(null))
    //     dispatch(setCurrentWarehouse({id: '', title: '', image: ''}))
    //     setAddItem(true)
    //     setComposition([])
    // }

    // const changeWarehouse = (warehouse: string) => {
    //     const newWarehouse = warehouses.find(el => el.title === warehouse)
    //     newWarehouse && dispatch(setCurrentWarehouse(newWarehouse))
    // }
    // const addMaterialHandler = (id: string) => {
    //     setMaterialId(id)
    //     setAddMaterial(true)
    // }
    // const deleteMaterialOfProduct = (materialOfProduct: MaterialOfProductType) => {
    //     const newComposition = composition.filter(el => el.id !== materialOfProduct.id)
    //     const total = +(+totalCost - +materialOfProduct.price).toFixed(2)
    //     dispatch(setAllPurchases(allPurchases.map(el => el.id === materialOfProduct.id
    //         ? {...el, amount: el.amount && (+el.amount + +materialOfProduct.amount).toString()}
    //         : el)))
    //     setComposition(newComposition)
    //     setTotalCost(total)
    // }
    // const changeAmountMaterial = (amount: string, el: PurchaseType) => {
    //     setAmountOfMaterial(amount)
    //     let price
    //     if (el.unitPrice) price = (+el.unitPrice * +amount).toFixed(2)
    //     if (price) setPriceOfMaterial(price.toString())
    //
    //
    // }

    // const addMaterialOfProduct = (materialOfProduct: MaterialOfProductType) => {
    //     const exist = composition.find(el => el.id === materialOfProduct.id)
    //     if (exist) {
    //         const newAmount = (((+exist.amount + +materialOfProduct.amount) * count).toFixed(2)).toString()
    //         const newPrice = (((+exist.price + +materialOfProduct.price) * count).toFixed(2)).toString()
    //         setComposition(composition.map(el => el.id === materialOfProduct.id ? {
    //             ...el,
    //             amount: newAmount,
    //             price: newPrice
    //         } : el))
    //     } else {
    //         setComposition([...composition, materialOfProduct])
    //     }
    //     dispatch(setAllPurchases(allPurchases.map(el => el.id === materialOfProduct.id
    //         ? {...el, amount: el.amount && ((+el.amount - (+materialOfProduct.amount * count)).toFixed(2)).toString()}
    //         : el)))
    //     setAmountOfMaterial('')
    //     setPriceOfMaterial('')
    //     setAddMaterial(false)
    //     let total = +(+totalCost + +materialOfProduct.price).toFixed(2)
    //
    //     setTotalCost(total)
    // }
    const deleteProductHandler = (id: string) => {
        dispatch(DeleteProductTC(id))
    }
    const photoEditHandler = (id: string) => {
        setAddPhoto(true)
        setChangePhotoId(id)
    }
    const cancelEditPhoto = () => {
        setAddPhoto(false)
        setChangePhotoId('')
        dispatch(setCurrentImage(null))
    }

    const saveEditImage = (id: string) => {
        currentImage && dispatch(ChangeProductImageTC(id, currentImage))
    }

    return (

        <div>
            {addItem
                ? <div className={cardClass.addItem} onClick={() => setAddItem(false)}>
                    <div className={cardClass.newItem}>+</div>
                    <div>Добавить изделие</div>
                </div>
                : <AddNewProduct addItem={addItem}
                                 setAddItem={setAddItem}
                                 id={id}/>
                // <div>
                //     <div>
                //         <LoadImage/>
                //         <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                //         <button onClick={() => composition && addNewProduct(userId,title, id ? id : '', composition)}>+
                //         </button>
                //     </div>
                //     <div className={cardClass.commonCompositionWrapper}>
                //         <div className={cardClass.compositionWrapper}>
                //             <div>Состав изделия:</div>
                //             <div className={cardClass.composition}>
                //                 {composition?.map((el) => <div key={el.id}>
                //                     <div>{el.purchaseTitle}  </div>
                //                     <span>{count > 1 && <span>{count} * </span>} { (+el.amount ).toFixed(2)} </span>
                //                     <span>{el.unit} </span>
                //                     <span>{(+el.price * count).toFixed(2)} BYN</span>
                //                     <button onClick={() => deleteMaterialOfProduct(el)}>x</button>
                //
                //                 </div>)}
                //
                //                 {composition.length > 0 ? <div>
                //                         <div> кол-во: {count}
                //                             <button onClick={() => setCount(count + 1)}>+</button>
                //                         </div>
                //
                //                         {count > 1
                //                             ? <div>себестоимость : {(+totalCost * count).toFixed(2) }BYN ({totalCost}BYN/шт)</div>
                //                             : <div>себестоимость : {totalCost.toFixed(2)}</div>
                //                         }
                //                     </div>
                //                     : ''}
                //             </div>
                //             {composition.length > 0 &&
                //                 <button onClick={() => id && addNewProduct(userId,title, id, composition)}>
                //                     добавить изделие на склад
                //                 </button>}
                //         </div>
                //         <div className={cardClass.choiceMaterialWrapper}>
                //             <div>Материалы на складе:</div>
                //             <select value={currentWarehouse ? currentWarehouse.title : 'выберите склад'}
                //                     onChange={(e) => changeWarehouse(e.currentTarget.value)}>
                //                 <option>укажите склад</option>
                //                 {warehouses.map(el => <option key={el.id}>{el.title}</option>
                //                 )}
                //
                //             </select>
                //
                //
                //             {currentWarehouse && allPurchases.map(el => el.warehouseId === currentWarehouse.id
                //                 ? <div key={el.id} style={{display: 'flex'}}>
                //                     <img src={el.image} style={{width: '30px'}} alt={el.title}/>
                //                     <div> {el.title} </div>
                //                     <div> {el.amount} </div>
                //                     <div> {el.unit} </div>
                //                     <div> {el.unitPrice} BYN/{el.unit}</div>
                //                     <div>
                //                         {addMaterial && el.id === materialId
                //                             ? <div>
                //                                 <input
                //                                     autoFocus
                //                                     type={'number'}
                //                                     value={amountOfMaterial}
                //                                     onChange={e => changeAmountMaterial(e.currentTarget.value, el)}
                //
                //                                 />
                //                                 <button onClick={() => el.amount && el.unit && el.price &&
                //                                     addMaterialOfProduct({
                //                                         warehouseId: currentWarehouse && currentWarehouse.id,
                //                                         purchaseTitle: el.title,
                //                                         amount: amountOfMaterial,
                //                                         unit: el.unit,
                //                                         price: priceOfMaterial,
                //                                         id: el.id ? el.id : '',
                //                                     })}>add
                //                                 </button>
                //                                 <button onClick={() => {
                //                                     setAddMaterial(false)
                //                                 }}>cancel
                //                                 </button>
                //
                //                             </div>
                //                             : <IoMdAdd onClick={() => el.id && addMaterialHandler(el.id)}/>
                //                         }
                //                     </div>
                //                 </div>
                //                 : ''
                //             )}
                //         </div>
                //     </div>
                // </div>
            }
            <div className={cardClass.cardWrapper}>
                {products.map(product => {
                    const {id, image, title} = product
                    return (
                        <div className={cardClass.card} key={id}>
                            <div>{title}</div>
                            <button onClick={() => id && deleteProductHandler(id)}>delete</button>


                            {addPhoto && product.id === changePhotoId
                                ? <div>
                                    <LoadImage/>
                                    <button onClick={() => product.id && saveEditImage(product.id)}>
                                        save
                                    </button>
                                    <button onClick={cancelEditPhoto}>
                                        cancel
                                    </button>
                                </div>
                                : <div>
                                    <img src={image} className={cardClass.img} alt={title}/>
                                    <button onClick={() => product.id && photoEditHandler(product.id)}>
                                        {image ? 'add photo' : 'edit photo'}
                                    </button>
                                </div>

                            }
                            <div>кол-во: {product.count}</div>
                            <div className={cardClass.composition}
                                 onMouseEnter={() => {
                                     setHoverComposition(true)
                                     product.id && setProductId(product?.id)
                                 }}
                                 onMouseLeave={() => {
                                     setHoverComposition(false)
                                     setProductId('')
                                 }}
                            >
                                состав изделия
                                {hoverComposition && product.id === productId
                                    ? <div> {product.productComposition.map((el) => {
                                        console.log(product.productComposition)
                                        return (
                                            <div>
                                                <span> {el.purchaseTitle} </span>
                                                <span> {Number(el.amount).toFixed(2)} {el.unit}</span>
                                                <span> {Number(el.price).toFixed(2)}BYN </span>

                                            </div>)
                                    })}</div>
                                    : ''}

                            </div>

                        </div>
                    )
                })}</div>
        </div>
    )
}