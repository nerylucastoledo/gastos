import { Header } from "../../components/Header/Header"
import styles from './Home.module.css'

export const Home = () => {
  // const username = window.localStorage.getItem('username')

  return (
    <div>
      <Header />
      <main 
        className={`${styles['main']} `}>
        MAIN
      </main>
    </div>
  )
}
