import styles from './Select.module.css'
import { useDataByFilter } from '../../Context/DataByFilters';
import { monthsAndYears } from '../../utils/utils';

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

export const Select = () => {
  const { month, setMonth, year, setYear } = useDataByFilter()
  const { months, years } = monthsAndYears()

  return (
    <div className={styles['box-select']}>
      <select 
        className={styles['select']} 
        defaultValue={month} 
        onChange={({target}) => setMonth(target.value)}
      >
        {months.map(uniqueMonth => (
          <option key={uniqueMonth} value={uniqueMonth}>{uniqueMonth}</option>
        ))}
      </select>

      <select 
        className={styles['select']} 
        defaultValue={year} 
        onChange={({target}) => setYear(target.value)}
      >
        {years.reverse().map(uniqueYear => (
          <option key={uniqueYear} value={uniqueYear}>{uniqueYear}</option>
        ))}
      </select>
    </div>
  )
}
