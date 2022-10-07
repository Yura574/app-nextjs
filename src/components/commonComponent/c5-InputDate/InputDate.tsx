import inputClass from './inputDate.module.css'
import {areEqual, calendar} from "./utilFuncs";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import { setData} from "../../../store/reducers/date-reducer";
import {useEffect} from "react";
import {setCurrentDate} from "../../../store/reducers/currentItems-reducer";


export const InputDate = () => {
    const dispatch = useAppDispatch()
    const newDate = useAppSelector<Date>(state => state.date.date)

    const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вскр',]




    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const day = newDate.getDate()

    const monthData = calendar(year, month)

    useEffect(() => {
        dispatch(setCurrentDate(`${day}/${month + 1}/${year}`))
    })

    const handlePrevMonthButtonClick = (year: number, month: number) => {
        console.log(year, month)
        const date = new Date(year, month - 1)
        dispatch(setData(date))
    }
    const handleNextMonthButtonClick = (year: number, month: number) => {
        const date = new Date(year, month + 1)
        dispatch(setData(date))
    }

    const handleSelectedMonthChange = (month: string) => {
        const index = months.indexOf(month)
        const date = new Date(year, index)
        dispatch(setData(date))
    }

    const handleSelectedYearChange = (year: string) => {
        const date = new Date(+year, month)
        dispatch(setData(date))
    }

    const handleDayClick = (date: Date) => {
        console.log(date)
        dispatch(setData(new Date(year, month, date.getDate())))
    }


    return (
        <div>
            <div>
                <div className={inputClass.header}>
                    <button onClick={() => handlePrevMonthButtonClick(year, month)}>{'<'}</button>
                    <select
                        value={months[month]}
                        onChange={e => handleSelectedMonthChange(e.currentTarget.value)}>{months.map((name, index) =>
                        <option key={index}>{name}</option>)}</select>
                    <select
                        value={year}
                        onChange={e => handleSelectedYearChange(e.currentTarget.value)}>{years.map((name, index) =>
                        <option key={index}>{name}</option>)}</select>
                    <button onClick={() => handleNextMonthButtonClick(year, month)}>{'>'}</button>
                </div>

                <div className={inputClass.tableWrapper}>

                    <div className={inputClass.dayNames}>
                        {days.map((name, index) => <div key={index}>{name}</div>)}
                    </div>

                    <div className={inputClass.dates}>
                        {monthData.map((week: Array<Date>, index: number) =>
                            <div key={index} className={inputClass.week}>
                                {week.map((date: Date , index: number) => {
                                        return (
                                            date
                                                ? <div key={index}
                                                       className={`${inputClass.day} 
                                                ${areEqual(newDate, date) ? inputClass.active : ''} `}
                                                       onClick={() => handleDayClick(date)}>
                                                    {date.getDate()}
                                                </div>
                                                : <div key={index} className={inputClass.shadowDay}/>
                                        )
                                    }
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}