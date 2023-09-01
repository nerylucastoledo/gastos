import { useState } from 'react'
import styles from './Select.module.css'

export interface IBill {
  item: string;
  value: number;
  description: string;
  card: string;
  people: string;
  category: string;
}

export interface IBillByDate {
  salary: number,
  name: string,
  content: IBill[]
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novamebro',
  'Dezembro'
]

const currentYearMoreNine = new Date().getFullYear() + 9
const currentMonth = new Date().getMonth() + 1

export const Select = () => {
  const [month, setMonth] = useState(months[currentMonth])
  const [year, setYear] = useState(currentYearMoreNine - 9)
  const years = [currentYearMoreNine]

  // const { data, loading, error } = useFecth<IBillByDate>(`http://localhost:8080/bill?username=LucasNery260196&date=${month+year}&people=&card=&category=`)
  
  // console.log(data)
  // console.log(loading)
  // console.log(error)

  for (let i = 1; i <= 11; i++) {
    years.push(currentYearMoreNine - i)
  }

  return (
    <div className={styles['box-select']}>
      <select className={styles['select']} defaultValue={month}>
        {months.map(month => <option key={month} value={month}>{month}</option>)}
      </select>
      <select className={styles['select']} defaultValue={year}>
        {years.reverse().map(year => <option key={year} value={year}>{year}</option>)}
      </select>
    </div>
  )
}
