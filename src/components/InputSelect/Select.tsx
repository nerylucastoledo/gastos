import styles from './Select.module.css'
import { monthsAndYears } from '../../utils/utils';

export interface IBill {
  id: number;
  item: string;
  value: number;
  description: string;
  card: string;
  people: string;
  category: string;
  date: string;
}

export interface IBillByDate {
  salary: number,
  name: string,
  content: IBill[]
}

interface IProps {
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  month: string;
  year: string;
}

export const Select = ({ setMonth, setYear, month, year }: IProps) => {
  const { months, years } = monthsAndYears()

  return (
    <div className={styles['box-select']}>
      <select 
        className={styles['select']} 
        defaultValue={month} 
        onChange={({target}) => setMonth(target.value)}
        data-testid="select-month"
      >
        {months.map(uniqueMonth => (
          <option key={uniqueMonth} value={uniqueMonth}>{uniqueMonth}</option>
        ))}
      </select>

      <select 
        className={styles['select']} 
        defaultValue={year} 
        onChange={({target}) => setYear(target.value)}
        data-testid="select-year"
      >
        {years.reverse().map(uniqueYear => (
          <option key={uniqueYear} value={uniqueYear}>{uniqueYear}</option>
        ))}
      </select>
    </div>
  )
}
