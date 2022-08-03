import loginClass from "./login.module.css";
import SuperInput from "../c1-SuperInput/SuperInput";
import SuperCheckbox from "../c3-SuperCheckbox/SuperCheckbox";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useEffect, useState} from "react";
import {RegistrationTC, RegistrationType, setError} from "../../../store/reducers/auth-reducer";
import inputClass from "../c1-SuperInput/SuperInput.module.css";

export const Registration = () => {
    const dispatch = useAppDispatch()
    const error = useAppSelector<string>(state => state.auth.error)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    let validPassword = ''
    useEffect(() => {
        dispatch(setError(''))
    }, [password, repeatPassword])

    const registration = (user: RegistrationType) => {
        if (password === repeatPassword) {
            validPassword= password
            console.log(user)
            dispatch(RegistrationTC({...user, password: validPassword}))
        } else {
            dispatch(setError('пароль не совпадает'))
            console.log('пароль не совпадает')
        }
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
                    />
                </div>
                <div className={loginClass.input}>
                    <SuperInput label={'email'}
                                value={email}
                                onChangeText={setEmail}
                                className={loginClass.input}/>
                </div>
                <div className={loginClass.input}>
                    <SuperInput
                        type={"password"}
                        label={'password'}
                                className={error? loginClass.error: ''}
                                value={password}
                                onChangeText={setPassword}/>
                </div>
                <div className={loginClass.input}>
                    <SuperInput
                        type={"password"}
                        label={'repeat password'}
                        error={error}
                        value={repeatPassword}
                        spanClassName={loginClass.error}
                        errorClassName={error? inputClass.err: ''}
                        onChangeText={setRepeatPassword}
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
                <button className={loginClass.regButton}
                        onClick={() => registration({name, email, password: validPassword})}
                >Зарегистрироваться
                </button>
            </div>
        </div>
    )

}