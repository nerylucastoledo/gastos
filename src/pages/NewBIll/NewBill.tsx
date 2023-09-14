import React, { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import styles from './NewBill.module.css'
import { useDataByFilter } from '../../Context/DataByFilters'
import { Header } from '../../components/Header/Header'
import { Loading } from '../../components/Loading/Loading'
import { sendData } from '../../utils/SendDataApi'
import { Popup } from '../../components/Popup/Popup'
import { monthsAndYears } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

const styleInput: React.CSSProperties = {
  marginTop: '6px', 
  backgroundColor: 'var(--color-4)', 
  width: '100%', 
}

const styleLabel: React.CSSProperties = {
  color: 'var(--color-4)', 
  fontWeight: 'bold'
}

interface IBody {
  item: string;
  username: string | null;
  value: number;
  people: string;
  category: string;
  date: string;
  card: string
}

export const NewBill = () => {
  const navigate = useNavigate()
  const { months, currentMonth, years, currentYear } = monthsAndYears()
  const { data, loading, error, setUpdate } = useDataByFilter()

  const [nameItem, setNameItem] = useState('')
  const [cardSelected, setCardSelect] = useState(data?.cardList.length ? data?.cardList[0].name : '')
  const [peopleSelected, setPeopleSelected] = useState('Eu')
  const [categorySelected, setCategorySelected] = useState(data?.categoryList.length ? data?.categoryList[0].name : '')
  const [checkbox, setCheckbox] = useState(false)
  const [installment, setInstallment] = useState('')
  const [value, setValue] = useState('')
  const [errorFields, setErrorFields] = useState<string[]>([])
  const [errorApi, setErrorApi] = useState('')
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setErrorFields([])

    if (!nameItem.length) setErrorFields((previous) => [...previous, 'item'])
    if (!cardSelected.length) setErrorFields((previous) => [...previous, 'card'])
    if (!categorySelected.length) setErrorFields((previous) => [...previous, 'category'])
    if (!value.length) setErrorFields((previous) => [...previous, 'value'])
    if (checkbox && Number(installment) <= 1) setErrorFields((previous) => [...previous, 'installment'])

    const url = `http://localhost:8080/bill${checkbox && Number(installment) > 1 ? '/list' : ''}`
    
    if (nameItem && value) {
      const body: IBody | IBody[] = createBody(Number(installment))
      create(body, url)
    }
  }

  const createBody = (installment: number) => {
    if (installment > 1) {
      const body = []
      let yearToInsert = Number(year)
      let indexOfMonth = months.indexOf(month)

      for(let index = 0; index < installment; index++) {
        const numberOfMonths = 11

        if (indexOfMonth > numberOfMonths) {
          yearToInsert = yearToInsert + 1
          indexOfMonth = (indexOfMonth - 1) - numberOfMonths
        }

        const name = `${nameItem} ${index + 1}-${installment}`
        const date = `${months[indexOfMonth]}${yearToInsert}`

        body.push({
          item: name,
          username: window.localStorage.getItem('username'),
          value: Number(value),
          people: peopleSelected,
          category: categorySelected as string,
          date: date,
          card: cardSelected as string
        })

        indexOfMonth += 1
      }

      return body
    }

    return {
      item: nameItem,
      username: window.localStorage.getItem('username'),
      value: Number(value),
      people: peopleSelected,
      category: categorySelected as string,
      date: `${month + year}`,
      card: cardSelected as string
    }
  }

  const create = (body: IBody | IBody[], url: string) => {
    const config = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  
    const response = sendData(url, { ...config })
    response.then(async (res) => {
      if (res.ok) {
        setUpdate(true)
        navigate('/')
      }
      throw new Error('Ocorreu um erro interno, tente novamente mais tarde')
    })
    .catch(({ message }) => {
      setErrorApi(message)
      setTimeout(() => setErrorApi(''), 2000)
    })
  }

  return (
    <>
      <Header />

      {errorApi.length ? <Popup background={'red'}>{errorApi}</Popup> : null}

      {!error && loading && <Loading />}

      {!error && !loading && (
        <div className={styles['content']}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="card" className={styles['label']}>Data</label>
            <div className={styles['box-select']}>
              <select 
                className={styles['select']} 
                defaultValue={currentMonth} 
                onChange={({target}) => setMonth(target.value)}
                data-testid="month-selected"
              >
                {months.map(uniqueMonth => (
                  <option key={uniqueMonth} value={uniqueMonth}>{uniqueMonth}</option>
                ))}
              </select>

              <select 
                className={styles['select']} 
                defaultValue={currentYear} 
                onChange={({target}) => setYear(target.value)}
                data-testid="year-selected"
              >
                {years.reverse().map(uniqueYear => (
                  <option key={uniqueYear} value={uniqueYear}>{uniqueYear}</option>
                ))}
              </select>
          </div>
            <div style={{ marginBottom: '16px' }}>
              <Input
                label='Item'
                typeInput='normal'
                type='text'
                style={{ ...styleInput, border: errorFields.includes('item') ? '1px solid red' : 'unset' }}
                styleLabel={{ ...styleLabel }}
                placeholder='Nome do item'
                value={nameItem}
                onChange={({ currentTarget }) => setNameItem(currentTarget.value)}
                data-testid="item-input"
              />
              {errorFields.includes('item') && <p className="error-input ">Preencha o nome</p>}
            </div>

            <div>
              <label htmlFor="card" className={styles['label']}>Cartão</label>
              <select 
                className={styles['select']} 
                defaultValue={cardSelected} 
                onChange={({target}) => setCardSelect(target.value)}
                name='card'
                style={{ border: errorFields.includes('card') ? '1px solid red' : 'unset' }}
                data-testid="card-selected"
              >
                {data?.cardList.map(card => (
                  <option key={card.id} value={card.name}>{card.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="people" className={styles['label']}>Pessoa</label>
              <select 
                className={styles['select']} 
                defaultValue={peopleSelected} 
                onChange={({target}) => setPeopleSelected(target.value)}
                name='people'
                data-testid="people-selected"
              >
                <option value={'Eu'}>{'Eu'}</option>
                {data?.peopleList.map(people => (
                  <option key={people.name} value={people.name}>{people.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category" className={styles['label']}>Categoria</label>
              <select 
                className={styles['select']} 
                defaultValue={categorySelected} 
                onChange={({target}) => setCategorySelected(target.value)}
                name='category'
                style={{ border: errorFields.includes('category') ? '1px solid red' : 'unset' }}
                data-testid="category-selected"
              >
                {data?.categoryList.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Input
                label='Valor'
                typeInput='normal'
                type='number'
                style={{ ...styleInput, border: errorFields.includes('value') ? '1px solid red' : 'unset' }}
                styleLabel={{ ...styleLabel }}
                placeholder='Digite o valor'
                value={value}
                onChange={({ currentTarget }) => setValue(currentTarget.value)}
                data-testid="value-input"
              />
              {errorFields.includes('value') && <p className="error-input ">Preencha o valor</p>}
            </div>

            <label htmlFor="installment" className={styles['checkbox']}>
              <input 
                type="checkbox" 
                name="installment" 
                id="installment" 
                onChange={() => setCheckbox(!checkbox)} 
                checked={checkbox} 
                data-testid="checkbox-installment"
              />
              Tem parcela?
            </label>

            {checkbox && (
              <div style={{ marginBottom: '16px' }}>
                <Input
                  label='Parcelas'
                  typeInput='normal'
                  type='number'
                  style={{ ...styleInput, border: errorFields.includes('installment') ? '1px solid red' : 'unset' }}
                  styleLabel={{ ...styleLabel }}
                  placeholder='Digite a quantidade'
                  value={installment}
                  onChange={({ currentTarget }) => setInstallment(currentTarget.value)}
                  data-testid="installment-input"
                />
                {errorFields.includes('installment') && <p className="error-input ">Parcela deve ser maior que 1</p>}
              </div>
            )}

            <Button typeBtn='principal' style={{ width: '100%', marginTop: '32px' }}>Cadastrar</Button>
          </form>
        </div>
      )}
    </>
  )
}

