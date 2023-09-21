import { useEffect, useState } from "react"
import { Header } from "../../components/Header/Header"
import { Select } from "../../components/InputSelect/Select"
import styles from './Report.module.css'
import { monthsAndYears, transformValueInReal } from "../../utils/utils"
import { IDataByFilter } from "../../Context/DataByFilters"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useFecth } from "../../hooks/useFecth"
import { ErrorScreen } from "../../components/ErrorScreen/ErrorScreen"
import { Loading } from "../../components/Loading/Loading"

interface IReport {
  "people": string;
  "value": number;
}

export const Report = () => {
  const username = useLocalStorage('username', '')

  const { currentMonth, currentYear } = monthsAndYears()
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)
  const [report, setReport] = useState<IReport[]>([])

  const { data, loading, error } = useFecth<IDataByFilter>(
    `${process.env.VITE_DEFAULT_URL}bill?username=${username[0]}&date=${month+year}`
  )

  useEffect(() => {
    setReport([])
    getValues()
  }, [data])

  const getValues = () => {
    const peoples = getPeoples()

    peoples.forEach((people) => {
      const value = data?.content.reduce((total, transaction) => {
        if (transaction.people === people) {
          return Number(total) + Number(transaction.value)
        } else {
          return Number(total) + 0
        } 
      }, 0)

      const body: IReport = {
        people: people as string,
        value: value as number
      }

      setReport((previous) => [...previous, body])
    })
  }

  const getPeoples = () => {
    const peoples = new Set<string>()
    data?.content.forEach((item) => peoples.add(item.people))
    return peoples
  }

  return (
    <>
      <Header />

      {error && <ErrorScreen />}

      {!error && loading && <div className={styles['home-loading']}><Loading /></div>}

      {!error && !loading && (
        <main className={styles['report']}>
          {report.length ? (
            <>
              <h1 className={styles['report-title']}>Relatório mensal</h1>

              <Select 
                setMonth={setMonth} 
                setYear={setYear} 
                month={month}
                year={year}
              />

              <div className={styles['box-table']}>
                <table className={styles['table']}>
                  <thead>
                    <tr>
                      {report.map((item) => (
                        <th  key={item.people}>{item.people}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {report.map((item) => (
                        <td key={item.people + item.value}>{transformValueInReal(item.value)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div style={{ padding: '32px', width: '100%', textAlign: 'center', color: 'var(--color-9)' }}>
              <i>Boooa! <br /> Você ainda não tem nenhum gasto para esse mês \o/</i>
            </div>
          )}
        </main>
      )}

    </>
  )
}
