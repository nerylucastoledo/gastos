import Bad from '../../assets/img/bad.png'
import styles from './ErrorScreen.module.css'

export const ErrorScreen = () => {
  return (
    <div className={styles['error']}>
      <img style={{ marginBottom: '32px'}} src={Bad} alt="Icone triste" />
      <p className={styles['paragraph']}>Infelizmente ocorreu um erro e não conseguimos buscar seus dados!</p>
      <p className={styles['paragraph']}>Tente novamente mais tarde</p>
    </div>
  )
}
