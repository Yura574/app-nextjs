import axios from "axios";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {decrement, increment} from "../store/counterReducer";
import {log} from "util";
import {userApi} from "../api/api";


// @ts-ignore
export const Categories =  () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector<number>(state => state.counter.value)
    const getUsers = () => {
        const users = userApi.getAllUsers().then(res => {
            console.log(res.data)
            return res.data
        })
        console.log(users)
        return users
    }
    return (
        <div>
            <div>{count}</div>
            <button onClick={() => dispatch(increment())}>inc</button>
            <button onClick={()=> dispatch(decrement())}>dec</button>
            <button onClick={getUsers}>get users</button>
        </div>
    )
}

//
// export const getServerSideProps = async ()=>{
//     const res = await axios.get('http://localhost:5000/users/all')
//     const result = await res.data
//
//
//     if (!result){
//         return {
//             notFound: true
//         }
//     }
//
//     return {
//         props:{result}
//     }
// }

