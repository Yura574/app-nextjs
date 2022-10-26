import {
    AddWarehouseTC,
    DeleteWarehouseTC, GetAllWarehousesTC, UpdateWarehouseTC,
    WarehouseType
} from "../../../../store/reducers/warehouse-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import classWarehouse from './materialsWarehouse.module.css'
import {Link} from "react-router-dom";
import {
    setCurrentImage, setCurrentWarehouse,
} from "../../../../store/reducers/currentItems-reducer";
import {RiImageAddFill} from "react-icons/ri";
import {LoadImage} from "../../../commonComponent/load_image/LoadImage";
import sEnter from "../Purchases/EnterDataPurchases.module.css";
import {DownloadItem} from "../../../commonComponent/DownloadItem/DownloadItem";

export const MaterialsWarehouse = () => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector<string>(state => state.profile.profile.id)
    const warehouses = useAppSelector<WarehouseType[]>(state => state.warehouses.warehouses)
    const currentImage = useAppSelector(state => state.currentItems.currentImage)
    const currentPurchase = useAppSelector(state => state.currentItems.currentPurchase)

    const [title, setTitle] = useState<string>('')
    const [warehouseId, setWarehouseId] = useState('')
    const [editImage, setEditImage] = useState(false)
    const [activeModal, setActiveModal] = useState<boolean>(false)

    useEffect(() => {
        if (currentImage) {
            dispatch(setCurrentImage(undefined))
        }
    }, [])
    useEffect(() => {
        dispatch(GetAllWarehousesTC(userId))
    }, [userId, dispatch])

    const deleteWarehouse = (warehouseId: string) => {
        dispatch(DeleteWarehouseTC(warehouseId))
    }

    const addNewWarehouse = (title: string) => {
        dispatch(AddWarehouseTC(userId, title, 'склад успешно добавлен', currentImage))
        setActiveModal(false)
        dispatch(setCurrentImage(null))
    }
    const changeImage = (id: string) => {
        setWarehouseId(id)
        setEditImage(true)
    }
    const editWarehouse = (warehouseId: string, title: string, warehouseImage: string, image?: File) => {
        dispatch(UpdateWarehouseTC(warehouseId, title, warehouseImage, image))
    }
    const activeModalHandler = () => {
        setActiveModal(true)
        setTitle('')
        dispatch(setCurrentWarehouse(null))
    }
    const cancelAddWarehouseHandler = () => {
        if (currentImage) dispatch(setCurrentImage(undefined))
        setActiveModal(false)
        setTitle('')
    }
    const cancelEditWarehouse = () => {
        setEditImage(false)
    }
    return (
        <div>
            <div className={sEnter.downloadWrapper} onClick={activeModalHandler}>
                <div className={sEnter.download}>+</div>
                <div>добавить закупку</div>
            </div>
            {activeModal? <DownloadItem activeModal={activeModal} currentPurchase={currentPurchase} title={title} setTitle={setTitle} cancelAddWarehouseHandler={cancelAddWarehouseHandler} addItemHandler={addNewWarehouse}/>: ''}
            <div>
                {warehouses.map(warehouse => <div key={warehouse.id}>
                    <div>
                        <div>
                            <span><Link to={`warehouse/${warehouse.id}`}>{warehouse.title} </Link></span>
                            <span onClick={()=>changeImage(warehouse.id)}><RiImageAddFill/></span>
                            <div className={classWarehouse.wrapper}>
                                {editImage && warehouse.id === warehouseId
                                    ? <span>
                                        <button onClick={()=> editWarehouse(warehouse.id, warehouse.title, warehouse.image? warehouse.image: '', currentImage)}>edit</button>
                                        <button onClick={cancelEditWarehouse}>cancel</button>
                                        <LoadImage warehouse={warehouse} />

                                    </span>
                                    : <Link to={`warehouse/${warehouse.id}`}>
                                    <img className={classWarehouse.image}
                                         src={warehouse.image
                                             ? warehouse.image
                                             : warehouse.title}
                                         alt={warehouse.title}/>
                                </Link>}
                                <div className={classWarehouse.description}>
                                    <div>кол-во материалов на складе</div>
                                    <div>сумма товаров на складе</div>
                                    <button onClick={() => deleteWarehouse(warehouse.id)}>x</button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>)}
            </div>
        </div>)
}