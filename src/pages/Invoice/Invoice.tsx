import { useNavigate, useParams } from "react-router-dom"
import { useDataByFilter } from "../../Context/DataByFilters"
import { useFecth } from "../../hooks/useFecth"
import { Header } from "../../components/Header/Header";
import styles from './Invoice.module.css'
import { Loading } from "../../components/Loading/Loading";
import { ErrorScreen } from "../../components/ErrorScreen/ErrorScreen";
import { useEffect, useState } from "react";
import { InvoicePeople } from "../../components/InvoicePeople/InvoicePeople";
import { InvoiceItem } from "../../components/InvoiceItem/InvoiceItem";
import { IBill } from "../../components/InputSelect/Select";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { Popup } from "../../components/Popup/Popup";
import { Input } from "../../components/Input/Input";
import { sendData } from "../../utils/SendDataApi";
import { Arrowback } from '../../assets/arrowback'
import { transformValueInReal } from "../../utils/utils";

interface IContent {
  content: IBill[]
}

export const Invoice = () => {
  const { name_card } = useParams()
  const navigate = useNavigate()
  const username = window.localStorage.getItem('username')
  const { month, year } = useDataByFilter()

  const [peopleSelected, setPeopleSelected] = useState('Eu')
  const [peoples, setPeoples] = useState<undefined | string[]>([])
  const [invoice, setInvoice] = useState<undefined | IBill[]>(undefined)
  const [modalEdit, setModalEdit] = useState<boolean | IBill>(false)
  const [modalDelete, setModalDelete] = useState<boolean | IBill>(false)
  const [activeTooltip, setActiveTooltip] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [totalInvoice, setTotalInvoice] = useState(0)

  const [item, setItem] = useState('')
  const [value, setValue] = useState('')

  const { data, loading, error, setUpdate } = useFecth<IContent>(
    `${process.env.VITE_DEFAULT_URL}bill/by-card?username=${username}&date=${month+year}&card=${name_card}`
  )
  const content = useDataByFilter()

  useEffect(() => {
    if (modalEdit !== true && modalEdit !== false) {
      setItem(modalEdit.item)
      setValue(modalEdit.value.toString())
    }
  }, [modalEdit])

  useEffect(() => {
    const peoples: Set<string> = new Set()
    data?.content.map(item => item.people !== 'Eu' && peoples.add(item.people))
    const dataFilterByName = data?.content.filter(item => item.people === peopleSelected)
    const value = dataFilterByName?.reduce((total, transaction) => Number(total) + Number(transaction.value), 0)
    setPeoples([...peoples])
    setInvoice(dataFilterByName)
    setTotalInvoice(value ? value : 0)
  }, [peopleSelected, data])

  const cardColor = content.data?.cardList.filter(card => card.name === name_card)[0].color

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (activeTooltip) {
      const target = event.target as HTMLElement

      if (target.classList.value.length) {
        setActiveTooltip(false)
      }
    }

    if (modalDelete || modalEdit) {
      const target = event.target as HTMLElement

      if (target.classList.value.includes('invoice')) {
        setModalDelete(false)
        setModalEdit(false)
      }
    }
  }

  const updateItem = () => {
    if (modalEdit !== true && modalEdit !== false) {
      const body = {
        id: modalEdit.id,
        item: item, 
        value: value, 
      }

      const config = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = sendData(`${process.env.VITE_DEFAULT_URL}bill/${modalEdit?.id}`, { ...config })
      response.then((res) => {
        if (res.ok) {
          setUpdate(true)
          setModalEdit(false)
          return
        }

        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 2000)
      })
    }
  }

  const deleteItem = () => {
    if (modalDelete !== true && modalDelete !== false) {
      const response = sendData(`${process.env.VITE_DEFAULT_URL}bill/${modalDelete?.id}`, { method: 'DELETE' })
      response.then((res) => {
        if (res.ok) {
          setUpdate(true)
          setModalDelete(false)
          return
        }

        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 2000)
      })
    }
  }

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }

    if (modalEdit) {
      updateItem()
      return
    }

    deleteItem()
  }

  return (
    <div>
      <Header />

      <main className={`${styles['invoice']} ${styles['animate-up']}  ${(modalEdit || modalDelete) && styles.active}`} onClick={closeModal}>
        {error && <ErrorScreen color="var(--color-1)" />}
        <div className={styles['btn-back']}>
          <Arrowback fill="var(--color-5)"/>
          <p onClick={() => navigate('/')}>Voltar</p>
        </div>
          <div 
            style={{ backgroundColor: cardColor }} 
            className={`${styles['invoice-card']}`}
          >
            <h2 className={styles['title']}>{name_card}</h2>
            {!error && loading && <Loading />}
            {!error && !loading && data && invoice && peoples && (
              <>
                <div style={{ display: 'flex' }}>
                  <InvoicePeople 
                    peoples={peoples} 
                    setPeopleSelected={setPeopleSelected}
                    peopleSelected={peopleSelected}
                  />

                  <InvoiceItem 
                    invoice={invoice}
                    setModalEdit={setModalEdit}
                    setModalDelete={setModalDelete}
                    setActiveTooltip={setActiveTooltip}
                    activeTooltip={activeTooltip}
                  />
                </div>
                <p className={styles['total-invoice-people']}>Total: {transformValueInReal(totalInvoice)}</p>
              </>
            )}
          </div>
      </main>

      {modalEdit && (
        <>
          <Modal>
            {showPopup ? <Popup background={'red'}>Ocorreu um erro interno!</Popup> : null}
            <form onSubmit={handleSubmit} data-testid={'form-update'}>
              <div style={{ marginBottom: '32px' }}>
                <Input
                  label={'Item'}
                  typeInput="normal" 
                  placeholder="Digite o nome" 
                  type="text"
                  data-testid='input-item'
                  value={item}
                  onChange={({ currentTarget }) => setItem(currentTarget.value)}
                  style={{ width: '100%', marginTop: '6px' }}
                  styleLabel={{ color: 'var(--color-5)', fontWeight: 'bold' }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <Input
                  label={'Valor'}
                  typeInput="normal" 
                  placeholder="Digite o valor" 
                  type="number"
                  data-testid='input-value'
                  value={value}
                  onChange={({ currentTarget }) => setValue(currentTarget.value)}
                  style={{ width: '100%', marginTop: '6px' }}
                  styleLabel={{ color: 'var(--color-5)', fontWeight: 'bold' }}
                />
              </div>
              <Button typeBtn='principal' id="criar" style={{ marginTop: '32px', width: '100%' }}>Atualizar</Button>
            </form>
          </Modal>
        </>
      )}

      {modalDelete !== false && (
        <>
          <Modal>
            {showPopup ? <Popup background={'red'}>Ocorreu um erro interno!</Popup> : null}
            <p data-testid="information-message" className='text-delete'>
              Tem certeza que quer deletar o(a) <b>{modalDelete !== true && modalDelete.item}</b>?
            </p>
            <div className='btn-delete'>
              <Button typeBtn='accepted' onClick={() => handleSubmit()}>Sim</Button>
              <Button typeBtn='refused' onClick={() => setModalDelete(false)}>Não</Button>
            </div>
        </Modal></>
      )}
    </div>
  )
}
