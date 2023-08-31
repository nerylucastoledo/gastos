import { Header } from "../../components/Header/Header"
import styles from './Home.module.css'
import { useData } from "../../Context/DataContext"
import { Loading } from "../../components/Loading/Loading"
import { Select } from "../../components/InputSelect/Select"
import { ErrorScreen } from "../../components/ErrorScreen/ErrorScreen"

export const Home = () => {
  const { data, loading, error } = useData()

  if (data === null) return null

  return (
    <div>
      <Header />
      {error !== null && <ErrorScreen />}

      {!error && loading && <Loading />}

      {!error && !loading && (
        <main className={styles['main']}>
          <Select />
{/* 
          <div>
            <div>
              <h2>Sua parte</h2>
              <p>R$ 100.258,90</p>
            </div>
            <div>
              <h2>Sobrando</h2>
              <p>R$ 100.258,90</p>
            </div>
          </div> */}
        </main>
      )}
    </div>
  )
}
