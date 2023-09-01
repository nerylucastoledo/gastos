import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

export const Chart = () => {
  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},]

  return (
    <LineChart width={372} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  )
}
