import { IDataByFilter } from '../../Context/DataByFilters'
import { transformValueInReal } from '../../utils/utils'
import styles from './LastRegistered.module.css'

export const LastRegistered = ({ data }: { data: IDataByFilter }) => {

  const registers = data?.content.reverse().slice(0, 5)

  return (
    <div className={styles['last-registred']} data-testid={'last-registered'}>
      {registers.length ? registers.map(((item, index) => (
        <div key={`${item.item} - ${index + 1}`} className={styles['last-registred-content']}>
          <div className={styles['box']} data-testid={'box'}>
            <p>Cartão: <span>{item.card}</span></p>
            <p>Valor: <span>{transformValueInReal(Number(item.value))}</span></p>
          </div>
          <p className={styles['item']}>Item: <span>{item.item}</span></p>
        </div>
      ))
      ) : (
        <p style={{ textAlign: 'center', color: 'var(--color-7)' }}>Nenhum cadastro ainda</p>
      )}
    </div>
  )
}
