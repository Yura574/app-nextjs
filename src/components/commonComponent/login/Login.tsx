import loginClass from './login.module.css'
import SuperInput from "../c1-SuperInput/SuperInput";
import SuperCheckbox from "../c3-SuperCheckbox/SuperCheckbox";
import {useState} from "react";
import {LoginTC} from "../../../store/reducers/auth-reducer";
import {useAppDispatch} from "../../../store/hooks";


export const Login = () => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = (email: string, password: string) => {
        dispatch(LoginTC(email, password))
    }
    return (
        <div className={loginClass.wrapper}>
            <div className={loginClass.loginForm}>
                <div>
                    Вход
                </div>
                <div className={loginClass.input}>
                    <SuperInput label={'email'}
                                value={email}
                                onChangeText={setEmail}
                                className={loginClass.input}/>
                </div>
                <div className={loginClass.input}>
                    <SuperInput label={'password'}
                                value={password}
                                onChangeText={setPassword}/>
                </div>
                <div className={loginClass.checkboxWrapper}>
                    <div className={loginClass.checkbox}>
                        <SuperCheckbox checked={true}/>
                        <div>Запомнить меня</div>
                    </div>
                    <div className={loginClass.forgetPassword}>
                        Забыли пароль?
                    </div>
                </div>
                <button className={loginClass.button} onClick={()=>login(email, password)}>Войти</button>
            </div>
        </div>
    )
}