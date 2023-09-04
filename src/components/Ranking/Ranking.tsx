import { IDataByFilter } from '../../Context/DataByFilters'
import { Start } from '../../assets/img/start'
import { transformValueInReal } from '../../utils/utils'
import styles from './Ranking.module.css'

interface IRankingCategory {
  name_category: string;
  total: number;
}

export const Ranking = ({ data }: { data: IDataByFilter }) => {
  const ranking: IRankingCategory[] = []
  const categorys = getCategorys()
  
  categorys.forEach((name_category: string) => {
    const total = data.content
      .filter((transaction) => transaction.category === name_category)
      .reduce((total, transaction) => Number(total) + Number(transaction.value), 0)
  
    ranking.push({ name_category, total })
  })

  function getCategorys() {
    const categorys = new Set<string>()
    data.content.forEach((transaction) => categorys.add(transaction.category))
    return categorys
  }

  const returnColorStar = (index: number) => {
    if (index === 0) return '#FFD700'
    return index === 1 ? '#C0C0C0' : '#CD7F32'
  }

  if (ranking.length) {
    ranking.sort((item, nextitem) => item.total < nextitem.total ? 1 : -1)
  }

  return (
    <div style={{ marginBottom: '24px', marginLeft: '16px' }} className={styles['ranking']}>
      {ranking.length ? ranking.map((item, index) => (
        <div className={styles['ranking-box']} key={item.name_category}>
          <div className={styles['ranking-box-position']}>
            {index <= 2 && <Start color={returnColorStar(index)}/>}
            <p>{index + 1}°</p>
          </div>
          <h3>{item.name_category}</h3>
          <div className={styles['line']}></div>
          <p>{transformValueInReal(item.total)}</p>
        </div>
      )) : <p style={{ margin: '0 auto' }}>Ranking indisponível no momento</p>}
    </div>
  )
}
