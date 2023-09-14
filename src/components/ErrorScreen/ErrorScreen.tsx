import Bad from '../../assets/img/bad.png'
import styles from './ErrorScreen.module.css'

export const ErrorScreen = ({ color = 'var(--color-7)' }) => {
  return (
    <div className={styles['error']}>
      <img style={{ marginBottom: '32px'}} src={Bad} alt="Icone triste" />
      <p style={{ color }} className={styles['paragraph']}>Infelizmente ocorreu um erro e não conseguimos buscar seus dados!</p>
      <p style={{ color }} className={styles['paragraph']}>Tente novamente mais tarde</p>
    </div>
  )
}
