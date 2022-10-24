import loginClass from "./login.module.css";
import SuperInput from "../commonComponent/c1-SuperInput/SuperInput";
import SuperCheckbox from "../commonComponent/c3-SuperCheckbox/SuperCheckbox";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect, useRef, useState} from "react";
import {RegistrationTC, RegistrationType, setError} from "../../store/reducers/auth-reducer";
import inputClass from "../commonComponent/c1-SuperInput/SuperInput.module.css";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector<string>(state => state.auth.error)
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    let validPassword = ''

    useEffect(() => {
        dispatch(setError({value: ''}))
    }, [password, repeatPassword, dispatch])

    const registration = (user: RegistrationType) => {
        if (password === repeatPassword) {
            validPassword = password
            dispatch(RegistrationTC({...user, password: validPassword}))
        } else {
            dispatch(setError({value: 'пароль не совпадает'}))
        }
    }
    // const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const repeatPasswordRef = useRef<HTMLInputElement | null>(null)

    const onKeyPressName = () => {
        emailRef.current?.focus()
    }
    const onKeyPressEmail = () => {
        passwordRef.current?.focus()
    }
    const onKeyPressPassword = () => {
        repeatPasswordRef.current?.focus()
    }
    const onKeyPressRepeatPassword = () => {
        registration({name, email, password: validPassword})
    }


    if (isAuth) {
        return <Navigate to={'/'}/>
    }
    return (
        <div>
            <div className={loginClass.loginForm}>
                <div>
                    Регистрация
                </div>
                <div className={loginClass.input}>
                    <SuperInput label={'name'}
                                value={name}
                                onChangeText={setName}
                                className={loginClass.input}
                                onEnter={onKeyPressName}
                    />
                </div>
                <div className={loginClass.input}>
                    <SuperInput label={'email'}
                                value={email}
                                onChangeText={setEmail}
                                className={loginClass.input}
                                ref={emailRef}
                                onEnter={onKeyPressEmail}/>
                </div>
                <div className={loginClass.input}>
                    <SuperInput
                        type={"password"}
                        label={'password'}
                        className={error ? loginClass.error : ''}
                        value={password}
                        onChangeText={setPassword}
                        ref={passwordRef}
                        onEnter={onKeyPressPassword}/>
                </div>
                <div className={loginClass.input}>
                    <SuperInput
                        type={"password"}
                        label={'repeat password'}
                        error={error}
                        value={repeatPassword}
                        spanClassName={loginClass.error}
                        errorClassName={error ? inputClass.err : ''}
                        onChangeText={setRepeatPassword}
                        ref={repeatPasswordRef}
                        onEnter={onKeyPressRepeatPassword}
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
                        onClick={() => registration({name, email, password: validPassword})}
                >Зарегистрироваться
                </button>
            </div>
        </div>
    )

}