import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {InputDate} from "../c5-InputDate/InputDate";
import {setOpenCalendar} from "../../../store/reducers/date-reducer";
import {useEffect} from "react";
import {setCurrentDate} from "../../../store/reducers/currentItems-reducer";


export const CurrentDate = () => {
    const dispatch = useAppDispatch()
    const newDate = useAppSelector<Date>(state => state.date.date)
    const openCalendar = useAppSelector<boolean>(state => state.date.openCalendar)



    const open = (open: boolean) => {
        dispatch(setOpenCalendar(open))
    }
    const cancel = () => {
        dispatch(setOpenCalendar(false))
    }
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const day = newDate.getDate()


    useEffect(() => {
        dispatch(setCurrentDate(`${day}/${month + 1}/${year}`))
    },[year, month, day])

    return (
        <div>

            <div>
                <span onClick={openCalendar ? () => open(false) : () => open(true)}>
                    open
                </span>
            </div>

            <div> {newDate.getDate()}/{newDate.getMonth() +1}/{newDate.getFullYear()} <span
                onClick={openCalendar ? () => open(false) : () => open(true)}> open</span>
            </div>



            <div>
                {openCalendar && <InputDate cancel={cancel}/>}

            </div>
        </div>
    )
}