import { useDataByFilter } from '../../Context/DataByFilters'
import { Header } from '../../components/Header/Header'
import { ProfileItem } from '../../components/ProfileItem/ProfileItem'
import { Input } from '../../components/Input/Input'
import { Loading } from '../../components/Loading/Loading'
import { ErrorScreen } from '../../components/ErrorScreen/ErrorScreen'
import { useEffect, useState } from 'react'
import UpdateBtn from '../../assets/img/update.png'

import styles from './Profile.module.css'
import { sendData } from '../../utils/SendDataApi'
import { Popup } from '../../components/Popup/Popup'

export const Profile = () => {
  const { data, loading, error, setUpdate } = useDataByFilter()
  const [salary, setSalary] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const idUser = window.localStorage.getItem('id')

  useEffect(() => {
    if (data) {
      setSalary(data.salary)
    }
  }, [data])

  const handle = () => {
    const config = {
      method: 'PUT',
      body: JSON.stringify({ 
        id: idUser,
        salary: Number(salary)
      }),
      headers: {
      'Content-Type': 'application/json',
      },
    }

    const response = sendData(`${process.env.VITE_DEFAULT_URL}user/${idUser}`, { ...config })
    response.then((res) => {
      if (res.ok) return setUpdate(true)

      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 2000)
    })
  }

  if (data === null && !loading && !error) return null
  return (
    <>
      <Header />
      <div className={styles['content-profile']}>
        {error && <ErrorScreen />}
        {!error && loading && (
          <div className={styles['content-loading']}>
            <Loading />
          </div>
        )}
        {!error && !loading && data && (
          <>
            {showPopup ? <Popup background={'red'}>Ocorreu um erro interno, tente novamente mais tarde!</Popup> : null}
            
            <h2 className={styles['title-profile']}>Olá, {data.name}</h2>
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Input 
                  label='Seu salário' 
                  typeInput='normal' 
                  styleLabel={{ fontSize: '18px', color: 'var(--color-5)' }}
                  value={salary} 
                  type='number'
                  onChange={({ currentTarget }) => setSalary(Number(currentTarget.value))}
                  data-testid="salary"
                />
              </div>
              {data.salary !== salary && (
                <img 
                  style={{ marginTop: '20px' }} 
                  src={UpdateBtn} 
                  alt="Botão de atualizar" 
                  onClick={handle}
                  data-testd="btn-save"
                />
              )}
            </div>

            <ProfileItem title={"Suas categorias"} nameItem="category" setUpdate={setUpdate} data={data?.categoryList} />
            <ProfileItem title={"Pessoas cadastradas"} nameItem="people" setUpdate={setUpdate} data={data?.peopleList}/>
            <ProfileItem title={"Cartões cadastrados"} nameItem="card" setUpdate={setUpdate} data={data?.cardList} />
          </>
        )}

      </div>  
    </>
  )
}
