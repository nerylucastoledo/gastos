import { useState } from "react"
import { Input } from "../input/Input"
import { Button } from "../Button/Button"
import { sendData } from "../../utils/SendDataApi"
import { Popup } from "../Popup/Popup"
import { ShowPopup } from "../../utils/utils"

export const NewCard = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000000')
  const [errorName, setErrorName] = useState(false)
  const [showPopup, setShowPopup] = useState<ShowPopup | null>(null)
  const username = window.localStorage.getItem('username')

  const insert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.length) return setErrorName(true)

    const config = {
      method: 'POST',
      body: JSON.stringify({ name, username, color }),
      headers: {
      'Content-Type': 'application/json',
      },
    }

    const response = sendData('http://localhost:8080/card', { ...config })
    response.then((res) => {
      if (res.ok) {
        notification({ message: `Ihuul! O cartão ${name} foi cadastrado. o/`, background: 'green' })
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
          label="Nome do cartão" 
          typeInput="normal" 
          placeholder="Digite o nome" 
          type="text"
          data-testid='input-name'
          value={name}
          onChange={({ currentTarget }) => setName(currentTarget.value)}
          style={{ width: '100%', marginTop: '6px', border: errorName ? '1px solid red' : 'unset' }}
          styleLabel={{ color: 'var(--color-7)', fontWeight: 'bold' }}
        />
        {errorName && <p className="error-input">Nome não pode ser vazio</p>}
      </div>

      <div>
        <Input
          type="color" 
          data-testid='input-color'
          id="body" 
          name="body"
          typeInput="normal"
          label="Cor do cartão"
          required
          styleLabel={{ color: 'var(--color-7)', fontWeight: 'bold' }}
          style={{ width: '100%', marginTop: '6px', padding: '4px 16px' }}
          onChange={({ target }) => setColor(target.value)}
          value={color}
        />
      </div>

      <Button typeBtn='principal' id="criar" style={{ marginTop: '32px', width: '100%' }}>Inserir</Button>
    </form>
  )
}
