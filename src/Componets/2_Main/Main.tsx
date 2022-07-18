import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../Redux/store";
import {decrement, increment} from '../../Redux/counter-reducer'


export const Main = () => {
    const value = useSelector<RootStateType, number>(state => state.counter.value)
    const dispatch = useDispatch()
    return <div>
        <div>Counter</div>
        <div>{value} </div>
        <div>
            <button onClick={()=>dispatch(increment())}>inc</button>
            <button onClick={()=> dispatch(decrement())}>dec</button>
        </div>


        <div>
            <input type={"file"}/>
        </div>
    </div>
}