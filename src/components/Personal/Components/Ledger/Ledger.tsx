import s from './ledger.module.css'


export const Ledger = () =>{
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
               
            </table>
        </div>
    )
}