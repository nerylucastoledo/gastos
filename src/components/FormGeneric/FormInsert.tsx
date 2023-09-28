import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Popup } from '../Popup/Popup'
import { ShowPopup } from '../../utils/utils'
import { sendData } from '../../utils/SendDataApi'
import { useDataByFilter } from '../../Context/DataByFilters'
import { useLocalStorage } from '../../hooks/useLocalStorage'

interface IProps {
  nameInput: string;
  url: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> 
}

export const FormInsert =  ({ nameInput, url, setIsModalOpen }: IProps) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [showPopup, setShowPopup] = useState<ShowPopup | null>(null)
  const username = useLocalStorage('username', '')
  const { data, setUpdate } = useDataByFilter()

  const insert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidName = validName()

    if (isValidName?.length) {
      notification({ message: 'Esse nome já esta cadastrado!', background: 'var(--color-error)' })
      return
    }

    if (!name.length) return setError(true)

    const config = {
      method: 'POST',
      body: JSON.stringify({ name: name, username: username[0] }),
      headers: {
      'Content-Type': 'application/json',
      },
    }

    const response = sendData(`${process.env.VITE_DEFAULT_URL}${url}`, { ...config })
    response.then((res) => {
      if (res.ok) {
        setUpdate(true)
        setIsModalOpen(false)
        return
      }

      notification({ message: 'Ocorreu um erro interno!', background: 'var(--color-error)' })
    }).catch(() => notification({ message: 'Ocorreu um erro interno!', background: 'var(--color-error)' }))
  }

  const validName = () => {
    if (nameInput === "categoria") {
      return data?.categoryList.filter((category) => category.name === name)
    }

    return data?.peopleList.filter((people) => people.name === name)
  }

  const notification = (props: ShowPopup) => {
    setShowPopup(props)

    setTimeout(() => {
      setShowPopup(null)
      setIsModalOpen(false)
    }, 2500)
  }

  return (
    <form onSubmit={insert}>
      {showPopup ? <Popup background={showPopup.background}>{showPopup.message}</Popup> : null}

      <div style={{ marginBottom: '32px' }}>
        <Input 
          label={`Nome da ${nameInput}`}
          typeInput="normal" 
          placeholder="Digite o nome" 
          type="text"
          data-testid='input-name'
          value={name}
          onChange={({ currentTarget }) => setName(currentTarget.value)}
          style={{ width: '100%', marginTop: '6px', border: error ? '1px solid var(--color-error)' : 'unset' }}
          styleLabel={{ color: 'var(--color-5)', fontWeight: 'bold' }}
        />
        {error && <p className="error-input">Nome da {nameInput} não pode ser vazia</p>}
      </div>

      <Button typeBtn='principal' id="criar" style={{ marginTop: '32px', width: '100%' }}>Inserir</Button>
    </form>
  )
}
