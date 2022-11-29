import s from './ledger.module.css'
import {useEffect} from "react";
import {GetLedgerEntriesTC} from "../../../../store/reducers/ledger-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {GetAccountsTC} from "../../../../store/reducers/accounts-reducer";


export const Ledger = () => {

    const dispatch = useAppDispatch()

    const userId = useAppSelector((state) => state.profile.profile.id)
    const ledgerEntries = useAppSelector(state => state.ledger.ledgerEntries)
    const accounts = useAppSelector(state => state.accounts.accounts)
    useEffect(() => {
        dispatch(GetAccountsTC(userId))
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(GetLedgerEntriesTC(userId))
    }, [dispatch, userId])
    return (
        <div>
            <div>
                <div>счет прибыли {accounts&& accounts.profit}</div>
                <div>счет себестоимости {accounts.primeCost}</div>
                <div>инвестированно {accounts.investment}</div>
                <div>задолженность {accounts.duty}</div>
            </div>
            <table className={s.table}>
                <caption>Журнал расходов и доходов</caption>
                <tr>
                    <th className={s.tableUnit}>название</th>
                    <th className={s.tableUnit}> операция</th>
                    <th className={s.tableUnit}> количество</th>
                    <th className={s.tableUnit}>стоимость</th>
                    <th className={s.tableUnit}>себестоимость</th>
                    <th className={s.tableUnit}>прибыль</th>
                    <th className={s.tableUnit}>дата</th>
                    <th className={s.tableUnit}>вложения</th>
                    <th className={s.tableUnit}>долг</th>

                </tr>
                {ledgerEntries.map(el => <tr>
                        <th className={s.tableUnit}>{el.title} </th>
                        <th className={s.tableUnit}>{el.operation}</th>
                        <th className={s.tableUnit}>{el.count}</th>
                        <th className={s.tableUnit}>{el.price}</th>
                        <th className={s.tableUnit}>{el.primeCost}</th>
                        <th className={s.tableUnit}>{el.profit}</th>
                        <th className={s.tableUnit}>{el.data} </th>
                        <th className={s.tableUnit}>{}</th>
                        <th className={s.tableUnit}>{}</th>
                    </tr>
                )
                }
            </table>

        </div>
    )
}