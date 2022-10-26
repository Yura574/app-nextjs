import {InputDate} from "../../commonComponent/c5-InputDate/InputDate";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setOpenCalendar} from "../../../store/reducers/date-reducer";


export const Favorites =() => {
    const dispatch = useAppDispatch()
    const currentDate = useAppSelector<string>(state => state.currentItems.currentDate)
    const openCalendar = useAppSelector<boolean>(state => state.date.openCalendar)


    const open = (open: boolean) => {
        dispatch(setOpenCalendar(open))
    }
    const cancel = () => {
        dispatch(setOpenCalendar(false))
    }
    return (
        <div>
            my favorites list
            <InputDate cancel={cancel} />
        </div>
    )
}