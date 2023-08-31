import styles from './Select.module.css'

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
  const years = [currentYearMoreNine]

  for (let i = 1; i <= 11; i++) {
    years.push(currentYearMoreNine - i)
  }

  return (
    <div className={styles['box-select']}>
      <select className={styles['select']} defaultValue={months[currentMonth]}>
        {months.map(month => <option key={month} value={month}>{month}</option>)}
      </select>
      <select className={styles['select']} defaultValue={currentYearMoreNine - 9}>
        {years.reverse().map(year => <option key={year} value={year}>{year}</option>)}
      </select>
    </div>
  )
}
