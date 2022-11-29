import React, { useRef} from 'react'
import loginClass from './login.module.css'


import SuperInput from "../commonComponent/c1-SuperInput/SuperInput";
import SuperCheckbox from "../commonComponent/c3-SuperCheckbox/SuperCheckbox";
import {useState} from "react";
import {LoginTC} from "../../store/reducers/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Navigate, NavLink} from "react-router-dom";


export const Login = React.memo(() => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const error = useAppSelector<string>(state => state.auth.error)

    const login = (email: string, password: string) => {
        dispatch(LoginTC(email, password))
    }
    const inputRef = useRef<HTMLInputElement | null>(null);
    const onKeyPressEmail = () => {
        inputRef.current?.focus();
    }
    const onKeyPressPassword = () => {
        login(email, password)
    }

    if (isAuth) {
        return <Navigate to={'/'}/>
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
                                className={loginClass.input}
                                onEnter={onKeyPressEmail}

                    />
                </div>
                <div className={loginClass.input}>
                    <SuperInput label={'password'}
                                onEnter={onKeyPressPassword}
                                error={error}
                                value={password}
                                autoFocus
                                onChangeText={setPassword}
                                ref={inputRef}

                    />
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
                <button className={loginClass.loginButton}
                        onClick={() => login(email, password)}

                >
                    Войти
                </button>
                <NavLink to={'/registration'} className={loginClass.regButtonWrapper}>
                    <button className={loginClass.loginButton}>Зарегистрироваться</button>
                </NavLink>
            </div>
        </div>
    )
})