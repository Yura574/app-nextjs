import {useState} from "react";

type StateType = {
    date: Date
    currentDate: Date
    selected: Date | null
}

export const InputDate = (props: { onChange: (date: Date) => void }) => {
    const date = new Date()
    const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вскр',]

    const [state, setState] = useState<StateType>({
        date: date,
        currentDate: new Date(),
        selected: null
    })


    const year = () => state.date.getFullYear()
    const month = () => state.date.getMonth()
    const day = () => state.date.getDate()
    const [selectMonth, setSelectMonth] = useState<number>(month)
    const [selectYear, setSelectYear] = useState<number>(year)

    const monthData = [
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
        [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
    ]

    const handlePrevMonthButtonClick = () => {
        const newDate = new Date(year(), month() - 1)
        const newState = state
        state.date = newDate
        setState(newState)
        console.log(newDate)
    }
    const handleNextMonthButtonClick = () => {
        const newDate = new Date(year(), month() + 1)
        const newState = state
        state.date = newDate
        setState(newState)
        console.log(newDate)
    }
    const handleSelectedMonthChange = (month: string) => {
        const index = months.indexOf(month)
        setSelectMonth(index)
        const date = new Date(selectYear, index)
        const newState = state
        state.selected = date
        setState(newState)
        console.log(state.selected)


    }
    const handleSelectedYearChange = (year: string) => {

        const date = new Date(+year, selectMonth)
        setSelectYear(+year)
        const newState = state
        state.selected = date
        setState(newState)
        console.log(state.selected)
    }

    const handleDayClick = (date: Date) => {
        console.log(date)
        const newState = state
        newState.selected = date
        setState(newState)

        props.onChange(date)
    }

    return (
        <div>
            <div>
                <header>
                    <button onClick={handlePrevMonthButtonClick}>{'<'}</button>
                    <select
                        onChange={e => handleSelectedMonthChange(e.currentTarget.value)}>{months.map((name, index) =>
                        <option key={index}>{name}</option>)}</select>
                    <select onChange={e => handleSelectedYearChange(e.currentTarget.value)}>{years.map((name, index) =>
                        <option key={index}>{name}</option>)}</select>
                    <button onClick={handleNextMonthButtonClick}>{'>'}</button>
                </header>

                <table>
                    <thead>
                    <tr>
                        {days.map((name, index) => <th key={index}>{name}</th>)}
                    </tr>
                    </thead>

                    <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index}>
                            {week.map((date, index) => date
                                ? <td key={index}
                                      onClick={() => handleDayClick(date)}>{date.getDate()}</td>
                                : <td key={index}>
                                </td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>

                {/*<div>{data}</div>*/}
            </div>

        </div>
    )
}