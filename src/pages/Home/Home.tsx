import { Header } from "../../components/Header/Header"
import styles from './Home.module.css'
import { Loading } from "../../components/Loading/Loading"
import { Select } from "../../components/InputSelect/Select"
import { ErrorScreen } from "../../components/ErrorScreen/ErrorScreen"
import { transformValueInReal } from "../../utils/formatToReal"
import { Chart } from "../../components/Chart/Chart"
import { Card } from "../../components/Card/Card"
import { LastRegistered } from "../../components/LastRegistered/LastRegistered"
import { Ranking } from "../../components/Ranking/Ranking"
import { useDataByFilter } from "../../Context/DataByFilters"

export const Home = () => {
  const { data, loading, error } = useDataByFilter()

  const valueToPay = data?.content.reduce((acc, transaction) => 
    transaction.people === 'Eu' ? 
    acc + Number(transaction.value) : 
    0, 0
  )

  if (data === null) return null
  return (
    <div>
      <Header />
      
      {error !== null && <ErrorScreen />}

      <main className={styles['main']}>
        {!error && loading && <Loading />}

        {!error && !loading && valueToPay !== undefined && (
          <> 
            <Select />

            <div className={styles['box-values']}>
              <div>
                <h2>Sua parte</h2>
                <p>{transformValueInReal(valueToPay)}</p>
              </div>
              <div className={styles['line']}></div>
              <div>
                <h2>Sobrando</h2>
                <p>{transformValueInReal(Number(data.salary) - valueToPay)}</p>
              </div>
            </div>

            {data.content.length ? (
              <>
                <Card data={data} />

                <Chart />

                <h2>Maiores gastos do mês</h2>
                <Ranking />

                <h2>Últimos cadastros</h2>
                <LastRegistered data={data}/>
              </>
            ) : (
              <>
                <div style={{ padding: '32px' }}>
                  <p style={{ textAlign: 'center' }}>Boooa! <br /> Você ainda não tem nenhum gasto para esse mês \o/</p>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
