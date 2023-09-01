import styles from './Card.module.css'
import CardImg from '../../assets/img/card.png'
import { transformValueInReal } from '../../utils/formatToReal'
import { IDataByFilter } from '../../Context/DataByFilters'

interface IInvoice {
  color_card: string;
  invoice: number;
  name_card: string;
}

export const Card = ({ data }: { data: IDataByFilter} ) => {
  const invoices = getInvoices()

  function getInvoices() {
    const cardsOfDate = getCardsOfDateSelected()
    const invoices: IInvoice[] = []
  
    cardsOfDate.forEach((cardName) => {
      const cartao = data.cardList.find((card) => card.name === cardName)
  
      if (cartao) {
        const invoice = data.content
          .filter((transaction) => transaction.card === cardName)
          .reduce((total, transaction) => total + transaction.value, 0)
  
        invoices.push({
          name_card: cartao.name,
          invoice,
          color_card: cartao.color,
        })
      }
    })
  
    return invoices
  }

  function getCardsOfDateSelected() {
    const cards = new Set()
    data.content.forEach((transaction) => cards.add(transaction.card))
    return cards
  }

  return (
    <div style={{ margin: '24px 16px'}}>
      <div data-testid="carousel" className={styles['carousel']}>
        {invoices.length ? invoices.map(card => (
          <div 
            key={card.name_card} 
            style={{ backgroundColor: card.color_card, flex: invoices.length > 1 ? '0 0 85%' : '0 0 100%' }} 
            className={styles['card']}
          >
            <div>
              <h3>{card.name_card}</h3>
              <img src={CardImg} alt="Icon card" />
            </div>
            <p>{transformValueInReal(card.invoice ?? 0)}</p>
          </div>
        )) : null}
      </div>
    </div>
  )
}
