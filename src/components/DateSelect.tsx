import { useState } from "react"
import { useForm, UseFormRegister } from 'react-hook-form';


// interface DateSelectProps {
//     register: UseFormRegister<any>; 
//   }

const DateSelect = () => {

    const { register } = useForm();

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedDay, setSelectedDay] = useState("");

    const daysInMonth = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate() || 30;

    const years = [2023, 2024, 2025]
    const months = [
                        'Січень',
                        'Лютий', 
                        'Березень', 
                        'Квітень', 
                        'Травень', 
                        'Червень', 
                        'Липень', 
                        'Серпень', 
                        'Вересень', 
                        'Жовтень', 
                        'Листопад', 
                        'Грудень'
                    ]

    return(
        <div className="income-select-date">
            <select 
                value={selectedYear}
                // onChange={(e) => {
                //     setSelectedYear(e.target.value)
                //     setSelectedMonth('')
                //     setSelectedDay('')
                // }}
                {...register("year")}
            >
                <option value="" disabled>Виберіть рік</option>
                {years.map((year) => (
                    <option key= {year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <select 
                value={selectedMonth}
                onChange={(e) => {
                    setSelectedMonth(e.target.value)
                    setSelectedDay('')
                    
                }}
                disabled = {!selectedYear}
            >
                <option value="" disabled >Виберіть місяць</option>
                {months.map((month, index) => (
                    <option key= {index} value={index+1}>
                        {month}
                    </option>
                ))}
            </select>

            <select 
                value={selectedDay}
                onChange={(e) => {
                    setSelectedDay(e.target.value)
                }}
                disabled = {!selectedMonth}
            >
                <option value="" disabled>Виберіть число</option>
                {[...Array(daysInMonth)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                        {index + 1}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DateSelect