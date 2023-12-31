import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useFecth } from '../../hooks/useFecth'
import { IBill } from '../InputSelect/Select'
import { useDataByFilter } from '../../Context/DataByFilters'
import styles from './Chart.module.css'
import { transformValueInReal } from '../../utils/utils'

interface IData {
  content: IBill[]
}

interface IPayload {
  value: number
}

interface ITooltip {
  label?: string;
  payload?: IPayload[]
}

const CustomTooltip = ({ payload, label }: ITooltip) => {
  if (payload?.length) {
    return (
      <div className={styles['custom']}>
        <p className={styles['label']}>Mês: <b>{label}</b></p>
        <p className={styles['value']}>Valor: <b>{transformValueInReal(payload[0].value)}</b></p>
      </div>
    );
  }

  return null;
};

export const Chart = () => {
  const initialMonthsChart = [
    {
      name: 'Jan', 
      valor: 0, 
    },
    {
      name: 'Fev', 
      valor: 0, 
    },
    {
      name: 'Mar', 
      valor: 0, 
    },
    {
      name: 'Abr', 
      valor: 0, 
    },
    {
      name: 'Mai', 
      valor: 0, 
    },
    {
      name: 'Jun', 
      valor: 0, 
    },
    {
      name: 'Jul', 
      valor: 0, 
    },
    {
      name: 'Ago', 
      valor: 0, 
    },
    {
      name: 'Set', 
      valor: 0, 
    },
    {
      name: 'Out', 
      valor: 0, 
    },
    {
      name: 'Nov', 
      valor: 0, 
    },
    {
      name: 'Dez', 
      valor: 0, 
    },
  ]
  const username = window.localStorage.getItem('username')
  const { year } = useDataByFilter()
  const { data, loading, error} = useFecth<IData>(
    `${process.env.VITE_DEFAULT_URL}bill/all?username=${username}&year=${year}`
  )


  if (!data?.content?.length) {
    return null
  }

  data.content.forEach(item => {
    const indexMonth = initialMonthsChart.findIndex(month => item.date.includes(month.name))
    initialMonthsChart[indexMonth].valor += Number(item.value)
  })

  if (loading) return (
    <div className={styles['loading-chart']}>
      <p>Carregando o gráfico...</p>
    </div>
  )

  if (!data.content.length || error) return <p>Dados vazio</p>
  return (
    <ResponsiveContainer width={'95%'} height={200} className={styles['chart']}>
      <LineChart data={initialMonthsChart} margin={{ left: 29, top: 5 }}>
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="1 1" fill='#eee'/>
        <Line type="monotone" dataKey="valor" stroke="#2199F3" />
        <XAxis dataKey="name" stroke='var(--color-9)'/>
        <YAxis 
          dataKey="valor" 
          stroke='var(--color-9)'
          tickFormatter={(value) =>  transformValueInReal(value)} 
          fontSize={12}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
