import { ICard } from '../../Context/DataContext'
import styles from './Card.module.css'
import CardImg from '../../assets/img/card.png'
import { transformValueInReal } from '../../utils/formatToReal'

export const Card = ({ data }: { data: ICard[] }) => {
  return (
    <div style={{ margin: '24px 16px'}}>
      <div className={styles['carousel']}>
        {data.map(card => (
          <div 
            key={card.id} 
            style={{ backgroundColor: card.color, flex: data.length > 1 ? '0 0 85%' : '0 0 100%' }} 
            className={styles['card']}
          >
            <div>
              <h3>{card.name}</h3>
              <img src={CardImg} alt="Icon card" />
            </div>
            <p>{transformValueInReal(0)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
