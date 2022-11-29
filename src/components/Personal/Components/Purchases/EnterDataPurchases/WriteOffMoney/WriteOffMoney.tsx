import {useAppDispatch, useAppSelector} from "../../../../../../store/hooks";
import React, {useEffect, useState} from "react";
import {GetAccountsTC, recoveryAccount} from "../../../../../../store/reducers/accounts-reducer";
import {
    addDutyEntry,
    addInvestmentEntry, deleteDutyEntry, deleteInvestmentEntry,
    deleteWriteOffEntry,
    setSum,
    SetWriteOffMoneyTC
} from "../../../../../../store/reducers/writeOffMoney-reducer";

type WriteOffMoneyType = {
    price: string
    setEnable: (enable: boolean) => void
    isInvest: boolean
    setIsInvest: (invest: boolean) => void
    error: string
    setError: (error: string) => void
    isDuty: boolean
    setIsDuty: (duty: boolean) => void
}


export const WriteOffMoney = React.memo((props: WriteOffMoneyType) => {
    const dispatch = useAppDispatch()

    const accounts = useAppSelector(state => state.accounts.accounts)
    const userId = useAppSelector(state => state.profile.profile.id)
    const sum = useAppSelector(state => state.writeOffMoney.sum)
    const writeOffEntries = useAppSelector(state => state.writeOffMoney.writeOffEntries)
    const invest = useAppSelector(state => state.writeOffMoney.investment)
    const duty = useAppSelector(state => state.writeOffMoney.duty)


    useEffect(() => {
        dispatch(GetAccountsTC(userId))
    }, [dispatch, userId])

    const [value, setValue] = useState<number>(0)
    const [account, setAccount] = useState<string>('')
    const [investTitle, setInvestTitle] = useState<string>('')
    const [sumInvest, setSumInvest] = useState<number>(0)


    let commonInvest = 0
    invest.map(el => commonInvest += el.sum)

    let commonDuty = 0
    duty.map(el => commonDuty += el.sum)


    const addSum = (sum: number, account: string) => {
        dispatch(SetWriteOffMoneyTC(sum, account))
    }
    const addInvestHandler = (title: string, sum: number) => {
        if (props.isDuty) {
            dispatch(addDutyEntry({title, sum}))
            dispatch(setSum(sum))
            props.setIsDuty(false)
        } else {
            dispatch(addInvestmentEntry({title, sum}))
            dispatch(setSum(sum))

        }
        setInvestTitle('')
        setSumInvest(0)
        props.setIsInvest(false)


    }
    const onBlurHandler = () => {
        setTimeout(() => {
            setAccount('')
            setValue(0)
        }, 200)
    }
    const changeValueHandler = (value: number, accountValue: number) => {
        const restMoney = +props.price - sum
        if (value < accountValue && value < restMoney) {
            setValue(value)
        }
        if (value < accountValue && value > restMoney) {
            setValue(restMoney)
        }
        if (value > accountValue && accountValue < restMoney) {
            setValue(accountValue)
        }

    }
    const setAccountHandler = (account: string) => {
        if (account === 'profit' && accounts.profit === 0) {
            setAccount(account)
            props.setError('на счету не осталось средств')
            setTimeout(() => {
                setAccount('')
                props.setError('')
            }, 2000)
        }
        if (account === 'primeCost' && accounts.primeCost === 0) {
            setAccount(account)
            props.setError('на счету не осталось средств')
            setTimeout(() => {
                setAccount('')
                props.setError('')
            }, 2000)
        }
        if (+props.price !== sum) {
            setAccount(account)
        } else {
            setAccount(account)
            props.setError('- необходимая сумма уже списана')
            setTimeout(() => {
                setAccount('')
                props.setError('')
            }, 2000)
        }
    }
    const changeInvestValueHandler = (value: number) => {
        if (value < +props.price - sum) {
            setSumInvest(value)
        } else {
            setSumInvest(+props.price - sum)
        }
    }
    const setIsInvestHandler = () => {
        if (+props.price !== sum) {
            props.setIsInvest(true)
        } else {
            props.setIsInvest(true)
            props.setError('- необходимая сумма уже списана')
            setTimeout(() => {
                props.setIsInvest(false)
                props.setError('')
            }, 2000)
        }
    }
    const deleteWriteOff = (title: string, writeOff: string) => {
        if (writeOff === 'writeOff') {
            const find = writeOffEntries.find(el => el.title === title)
            if (find) {
                title === 'profit' && dispatch(deleteInvestmentEntry(find))
                dispatch(deleteWriteOffEntry(find))
                dispatch(setSum(-find.sum))
                dispatch(recoveryAccount({account: find.title, sum: find.sum}))

            }
        }
        if (writeOff === 'invest') {
            const find = invest.find(el => el.title === title)
            if(find) {
                dispatch(deleteInvestmentEntry(find))
                dispatch(setSum(-find.sum))
            }
        }
        if (writeOff === 'duty') {
            const find = duty.find(el => el.title === title)
            find && dispatch(deleteDutyEntry(find))
            find && setSum(-find.sum)
        }

    }

    useEffect(() => {
        if (+props.price === sum) {
            props.setEnable(true)
        }
    }, [props.price, sum])
    return (
        <div>
            <div>необходимо списать {props.price}</div>
            <div>общая сумма {sum}</div>
            {writeOffEntries.map(el => <div>списано со счета {el.title}: {el.sum}
                <button onClick={() => deleteWriteOff(el.title, 'writeOff')}>x</button>
            </div>)}
            <div>Вложено {commonInvest}</div>
            {invest.map(el => <div>вложено за счет {el.title}: {el.sum}
                <button onClick={() => deleteWriteOff(el.title, 'invest')}>x</button>
            </div>)}
            <div>Взято в долг {commonDuty}</div>
            {duty.map(el => <div>взято в долг {el.title}: {el.sum}
                <button onClick={() => deleteWriteOff(el.title, 'duty')}>x</button>
            </div>)}
            <div onClick={() => setAccountHandler('profit')}>
                <div>счет прибыли {accounts.profit} {account === 'profit' && props.error ?
                    <span>{props.error}</span> : ''}</div>
                {account === 'profit' && props.error ? '' : account === 'profit'
                    ? <div>
                        <input value={+value > accounts.profit ? accounts.profit : value === 0 ? '' : value}
                               onChange={(e) => changeValueHandler(+e.currentTarget.value, accounts.profit)}
                               onBlur={() => onBlurHandler()}
                               autoFocus
                        />
                        <button onClick={() => addSum(value, 'profit')}>+</button>
                    </div>
                    : ''
                }
            </div>
            <div onClick={() => setAccountHandler('primeCost')}>
                <div>счет себестоимости {accounts.primeCost} {account === 'primeCost' && props.error ?
                    <span>{props.error}</span> : ''}</div>
                {account === 'primeCost' && props.error ? '' : account === 'primeCost'
                    ? <div>
                        <input type={'number'}
                               value={value > +props.price ? props.price : value > accounts.primeCost ? accounts.primeCost : value === 0 ? '' : value}
                               onChange={(e) => changeValueHandler(+e.currentTarget.value, accounts.primeCost)}
                               onBlur={() => onBlurHandler()}
                               autoFocus/>
                        <button onClick={() => addSum(value, 'primeCost')}>+</button>
                    </div>
                    : ''
                }
            </div>
            <div onClick={setIsInvestHandler}>invest {props.isInvest && props.error ?
                <span>{props.error}</span> : ''}</div>
            <div>
                {props.isInvest && props.error ? '' : props.isInvest
                    ? <div>
                        <div>
                            <div>сумма<input type={"number"} value={sumInvest === 0 ? '' : sumInvest}
                                             onChange={(e) => changeInvestValueHandler(+e.currentTarget.value)}/></div>
                            <div>чьи деньги<input value={investTitle}
                                                  onChange={(e) => setInvestTitle(e.currentTarget.value)}/></div>
                            <div>долг <input checked={props.isDuty} type={'checkbox'}
                                             onChange={() => props.setIsDuty(!props.isDuty)}/></div>
                        </div>
                        <div>
                            <button onClick={() => addInvestHandler(investTitle, sumInvest)}>добавить</button>
                            <button onClick={() => {
                                props.setIsInvest(false)
                                props.setIsDuty(false)
                            }}>отмена
                            </button>
                        </div>
                    </div>
                    : ''}
            </div>

        </div>
    )

})