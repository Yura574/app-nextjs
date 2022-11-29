import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import React, {useEffect, useState} from "react";
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


export const Products = React.memo(() => {
    const {id} = useParams()

    const dispatch = useAppDispatch()
    const products = useAppSelector<ProductsType[]>(state => state.products.products)
    const userId = useAppSelector(state => state.profile.profile.id)
    const currentImage = useAppSelector(state => state.currentItems.currentImage)


    const [addItem, setAddItem] = useState<boolean>(true)
    const [addPhoto, setAddPhoto] = useState<boolean>(false)
    const [changePhotoId, setChangePhotoId] = useState<string>('')
    const [hoverComposition, setHoverComposition] = useState<boolean>(false)
    const [productId, setProductId] = useState<string>('')

    useEffect(() => {
        dispatch(GetAllWarehousesTC(userId))
    }, [userId, dispatch])
    useEffect(() => {
        id && dispatch(SetProductsTC(id))
    }, [id, dispatch])
    useEffect(() => {
        dispatch(GetAllPurchasesTC(userId))
    }, [userId, dispatch])

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
})