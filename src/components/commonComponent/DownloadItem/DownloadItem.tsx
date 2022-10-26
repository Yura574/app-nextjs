import s from "../../Personal/Components/Purchases/purchases.module.css";
import {LoadImage} from "../load_image/LoadImage";
import {Modal} from "../ModalWindow/Modal";
import {CurrentPurchaseType} from "../../../store/reducers/currentItems-reducer";


type DownloadItemType = {
    activeModal: boolean
    currentPurchase: CurrentPurchaseType
    title: string
    setTitle: (title: string)=> void
    cancelAddWarehouseHandler: ()=> void
    addItemHandler: (title: string)=> void
}


export const DownloadItem =(props: DownloadItemType) => {
    const {activeModal, currentPurchase, title, setTitle, cancelAddWarehouseHandler, addItemHandler} =props
    return (
        <Modal activeModal={activeModal}>
            <div style={{display: 'flex', padding: '20px'}}>
                <div style={{width: '200px'}}>
                    {currentPurchase.image
                        ? <img src={currentPurchase.image}
                               className={`${s.preview}`} alt={'preview'}/>
                        : <div><LoadImage/></div>
                    }
                    <input value={title} onChange={e => setTitle(e.currentTarget.value)}/>
                    <button onClick={() => addItemHandler(title)}> добавить склад</button>
                    <button onClick={cancelAddWarehouseHandler}> отмена</button>
                </div>
            </div>
        </Modal>
    )
}