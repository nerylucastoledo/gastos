import { Header } from "../../components/Header/Header"
import styles from './Home.module.css'
import { Loading } from "../../components/Loading/Loading"
import { Select } from "../../components/InputSelect/Select"
import { ErrorScreen } from "../../components/ErrorScreen/ErrorScreen"
import { Chart } from "../../components/Chart/Chart"
import { Card } from "../../components/Card/Card"
import { LastRegistered } from "../../components/LastRegistered/LastRegistered"
import { Ranking } from "../../components/Ranking/Ranking"
import { useDataByFilter } from "../../Context/DataByFilters"
import { transformValueInReal } from "../../utils/utils"
import { useEffect } from "react"

export const Home = () => {
  const { data, loading, error, setUpdate, setMonth, setYear, month, year } = useDataByFilter()
  const valueToPay = data?.content.reduce((acc, item) => {
    return item.people === 'Eu' ? Number(acc) + Number(item.value) : acc
  }, 0)

  useEffect(() => {
    setUpdate(true)
  }, [])

  return (
    <div>
      <Header />

      {error !== null && <ErrorScreen />}

      <main className={styles['main']}>
        {!error && loading && <div className={styles['home-loading']}><Loading /></div>}

        {!error && !loading && valueToPay !== undefined && data && (
          <div className={styles['animate-right']}> 
            <Select 
              setMonth={setMonth} 
              setYear={setYear} 
              month={month}
              year={year}
            />

            <div className={styles['box-values']}>
              <div>
                <h2>Sua parte</h2>
                <p>{transformValueInReal(valueToPay)}</p>
              </div>
              <div className={styles['line']}></div>
              <div>
                <h2>Sobrando</h2>
                <p style={{ color: Number(data.salary) - valueToPay > 0 ? 'var(--color-positive)' : 'var(--color-error)' }}>{transformValueInReal(Number(data.salary) - valueToPay)}</p>
              </div>
            </div>

            {data.content.length ? (
              <>
                <Card data={data} />

                <Chart />

                <h2>Ranking gastos do mês</h2>
                <Ranking data={data}/>

                <h2>Últimos cadastros</h2>
                <LastRegistered data={data}/>
              </>
            ) : (
              <>
                <div style={{ padding: '32px', width: '100%', textAlign: 'center', color: 'var(--color-9)' }}>
                  <i>Boooa! <br /> Você ainda não tem nenhum gasto para esse mês \o/</i>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
