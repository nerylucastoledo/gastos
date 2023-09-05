import React, { useState } from 'react'
import { Button } from '../Button/Button'
import { Input } from '../input/Input'
import { Popup } from '../Popup/Popup'
import { ShowPopup } from '../../utils/utils'
import { sendData } from '../../utils/SendDataApi'

interface IProps {
  nameInput: string;
  url: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> 
}

export const FormInsert =  ({ nameInput, url, setIsModalOpen }: IProps) => {
  const [name, setName] = useState('')
  const [errorCategory, setErrorCategory] = useState(false)
  const [showPopup, setShowPopup] = useState<ShowPopup | null>(null)
  const username = window.localStorage.getItem('username')

  const insert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.length) return setErrorCategory(true)

    const config = {
      method: 'POST',
      body: JSON.stringify({ name: name, username }),
      headers: {
      'Content-Type': 'application/json',
      },
    }

    const response = sendData(`http://localhost:8080/${url}`, { ...config })
    response.then((res) => {
      if (res.ok) {
        notification({ message: `Ihuul! ${name} foi cadastrado(a). o/`, background: 'green' })
        return
      }

      notification({ message: 'Ocorreu um erro interno!', background: 'red' })
    })
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
          style={{ width: '100%', marginTop: '6px', border: errorCategory ? '1px solid red' : 'unset' }}
          styleLabel={{ color: 'var(--color-7)', fontWeight: 'bold' }}
        />
        {errorCategory && <p className="error-input">{nameInput} não pode ser vazia</p>}
      </div>

      <Button typeBtn='principal' id="criar" style={{ marginTop: '32px', width: '100%' }}>Inserir</Button>
    </form>
  )
}
