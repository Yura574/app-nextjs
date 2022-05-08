import React, {useState} from "react";
import {nekoCardsAPI} from "../api/neko-cards-api";
import {useDispatch} from "react-redux";
import {setUser} from "../store/reducers/user-reducer";


const Login =() => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('yura5742248@gmail.com')
    const [password, setPassword] = useState('unbiliever13')
    // const[isAuth, setIsAuth] = useState(false)



    const submit = (email, password, rememberMe = false) => {
        nekoCardsAPI.login(email, password, rememberMe)
            .then(res => {
                dispatch(setUser(true))
            })
    }
    return(
        <div>
            <h1>Login</h1>

            <input value={email} onChange={(e)=> setEmail(e.currentTarget.value)}/>
            <input value={password} onChange={(e)=> setPassword(e.currentTarget.value)}/>
            <button onClick={() => submit(email, password)}>submit</button>
        </div>
    )
}

export default Login