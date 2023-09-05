import { useState } from "react"
import { Input } from "../input/Input"
import { Popup } from "../Popup/Popup"
import { ShowPopup } from "../../utils/utils"
import { Button } from "../Button/Button"
import { sendData } from "../../utils/SendDataApi"

export const NewCategory = ({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [category, setCategory] = useState('')
  const [errorCategory, setErrorCategory] = useState(false)
  const [showPopup, setShowPopup] = useState<ShowPopup | null>(null)
  const username = window.localStorage.getItem('username')

  const insert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!category.length) return setErrorCategory(true)

    const config = {
      method: 'POST',
      body: JSON.stringify({ name: category, username }),
      headers: {
      'Content-Type': 'application/json',
      },
    }

    const response = sendData('http://localhost:8080/category', { ...config })
    response.then((res) => {
      if (res.ok) {
        notification({ message: `Ihuul! A categoria ${category} foi cadastrada. o/`, background: 'green' })
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
          label="Nome da categoria" 
          typeInput="normal" 
          placeholder="Digite a categoria" 
          type="text"
          data-testid='input-category'
          value={category}
          onChange={({ currentTarget }) => setCategory(currentTarget.value)}
          style={{ width: '100%', marginTop: '6px', border: errorCategory ? '1px solid red' : 'unset' }}
          styleLabel={{ color: 'var(--color-7)', fontWeight: 'bold' }}
        />
        {errorCategory && <p className="error-input">Categoria não pode ser vazia</p>}
      </div>

      <Button typeBtn='principal' id="criar" style={{ marginTop: '32px', width: '100%' }}>Inserir</Button>
    </form>
  )
}
