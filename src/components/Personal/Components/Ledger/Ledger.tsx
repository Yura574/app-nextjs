import s from './ledger.module.css'
import {useEffect} from "react";
import {GetLedgerEntriesTC} from "../../../../store/reducers/ledger-reducer";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";


export const Ledger = () =>{

    const dispatch = useAppDispatch()

    const userId = useAppSelector((state)=> state.profile.profile.id)
    const ledgerEntries = useAppSelector(state => state.ledger.ledgerEntries)

    useEffect(()=>{
        dispatch(GetLedgerEntriesTC(userId))
    }, [dispatch, userId])
    return (
        <div>

            <table className={s.table}>
                <caption>Журнал расходов и доходов</caption>
                <tr>
                    <th className={s.tableUnit}>название </th>
                    <th className={s.tableUnit}> операция</th>
                    <th className={s.tableUnit}>стоимость</th>
                    <th className={s.tableUnit}>себестоимость</th>
                    <th className={s.tableUnit}>прибыль</th>
                    <th className={s.tableUnit}>вложения</th>
                    <th className={s.tableUnit}>дата</th>

                </tr>
                {ledgerEntries.map(el=> <tr>
                        <th className={s.tableUnit}>{el.title} </th>
                        <th className={s.tableUnit}>{el.operation}</th>
                        <th className={s.tableUnit}>{el.price}</th>
                        <th className={s.tableUnit}>{el.primeCost}</th>
                        <th className={s.tableUnit}>{el.profit}</th>
                        <th className={s.tableUnit}>{}</th>
                        <th className={s.tableUnit}>{el.data} </th>
                    </tr>
                )
                }
            </table>

        </div>
    )
}