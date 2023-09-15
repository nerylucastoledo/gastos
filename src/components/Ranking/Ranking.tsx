import { IDataByFilter } from '../../Context/DataByFilters'
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
      .filter((transaction) => transaction.people === 'Eu')
      .filter((transaction) => transaction.category === name_category)
      .reduce((total, transaction) => Number(total) + Number(transaction.value), 0)

    ranking.push({ name_category, total })
  })

  function getCategorys() {
    const categorys = new Set<string>()
    data.content.forEach((transaction) => transaction.people === 'Eu' && categorys.add(transaction.category))
    return categorys
  }

  const returnColorStar = (index: number) => {
    if (index === 0) return '#FFD700'
    if (index === 1) return '#C0C0C0'
    return index === 2 ? '#CD7F32' : '#333333'
  }

  if (ranking.length) {
    ranking.sort((item, nextitem) => item.total < nextitem.total ? 1 : -1)
  }

  return (
    <div className={styles['ranking']} data-testid='ranking'>
      {ranking.length ? ranking.map((item, index) => (
        <div className={styles['ranking-box']} key={item.name_category} style={{ backgroundColor: returnColorStar(index)}}>
          <h3>{item.name_category}</h3>
          <div className={styles['line']}></div>
          <p>{transformValueInReal(item.total)}</p>
        </div>
      )) : <p style={{ margin: '0 auto' }}>Ranking indisponível no momento</p>}
    </div>
  )
}
