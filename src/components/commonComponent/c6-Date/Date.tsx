import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {InputDate} from "../c5-InputDate/InputDate";
import {setOpenCalendar} from "../../../store/reducers/date-reducer";
import {Modal} from "../ModalWindow/Modal";


export const CurrentDate = () => {
    const dispatch = useAppDispatch()
    const currentDate = useAppSelector<string>(state => state.date.currentDate)
    const openCalendar = useAppSelector<boolean>(state => state.date.openCalendar)


    const open = (open: boolean) => {
        dispatch(setOpenCalendar(open))
    }
    const cancel = () => {
        dispatch(setOpenCalendar(false))
    }

    return (
        <div>
            <div> {currentDate} <span
                onClick={openCalendar ? () => open(false) : () => open(true)}> open</span></div>

            <div>
                <Modal activeModal={openCalendar} cancel={cancel}>
                    <InputDate/>
                </Modal>
            </div>
        </div>
    )
}