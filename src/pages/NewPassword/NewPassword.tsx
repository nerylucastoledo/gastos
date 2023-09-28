import { useNavigate, useParams } from 'react-router-dom'
import Logo from '../../assets/img/dark.png'
import styles from './NewPassword.module.css'
import { Input } from '../../components/Input/Input'
import { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Popup } from '../../components/Popup/Popup'
import { ShowPopup } from '../../utils/utils'
import { sendData } from '../../utils/SendDataApi'

export const NewPassword = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [password, setPassowrd] = useState('')
  const [confirmPassword, setConfirmPassowrd] = useState('')
  const [error, setError] = useState('')
  const [showPopup, setShowPopup] = useState<ShowPopup | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!password) return setError('password')
    if (!confirmPassword) return setError('confirm-password')

    if (password === confirmPassword) {
      const config = {
        method: 'PUT',
        body: JSON.stringify({ password, username }),
      }

      const response = sendData(`${process.env.VITE_DEFAULT_URL}user/reset-password`, { ...config })
      response.then(async (res) => {
        if (res.ok) return navigate('/login')
        if (!res.ok) throw new Error("Ocorreu um erro interno!")
      })
      .catch(({ message }) => {
        notification({ message, background: 'var(--color-error)' })
      })
      return
    }

    notification({ message: 'Senha não são iguais!', background: 'var(--color-error)' })
  }

  const notification = (props: ShowPopup) => {
    setShowPopup(props)
    setError('')

    setTimeout(() => {
      setShowPopup(null)
    }, 3000)
  }

  return (
    <div className='login-container'>
      {showPopup ? <Popup background={showPopup.background}>{showPopup.message}</Popup> : null}

      <img width={130} height={88} className='logo-center' src={Logo} alt="Logo da empresa" />

      <div className={styles['content']}>
        <h1>Atualizar senha</h1>
        <p className={'paragraph-default'} style={{ textAlign: 'start', marginTop: '12px' }}>
          Por favor, digite sua nova senha e confirme para que a alteração seja feita
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: '32px'}}>
            <Input 
              label={`Nova senha`}
              typeInput="normal" 
              placeholder="Digite a senha" 
              type="password"
              data-testid='input-password'
              autoComplete='on'
              value={password}
              onChange={({ currentTarget }) => setPassowrd(currentTarget.value)}
              style={{ width: '100%', marginTop: '6px', border: error === 'password' ? '1px solid var(--color-error)' : 'unset' }}
              styleLabel={{ color: 'var(--color-5)', fontWeight: 'bold' }}
            />
            {error === 'password' && <p className="error-input">Senha não pode ser vazia</p>}
          </div>

          <div style={{ marginTop: '32px'}}>
            <Input 
              label={`Confirme a senha`}
              typeInput="normal" 
              placeholder="Confirme a senha" 
              autoComplete='on'
              type="password"
              data-testid='input-confirm-password'
              value={confirmPassword}
              onChange={({ currentTarget }) => setConfirmPassowrd(currentTarget.value)}
              style={{ width: '100%', marginTop: '6px', border: error === 'confirm-password' ? '1px solid var(--color-error)' : 'unset' }}
              styleLabel={{ color: 'var(--color-5)', fontWeight: 'bold' }}
            />
            {error === 'confirm-password' && <p className="error-input">Senha não pode ser vazia</p>}
          </div>
        
          <Button style={{ display: 'block', margin: '32px auto 0'}} typeBtn='principal'>Atualizar</Button>
        </form>
      </div>

    </div>
  )
}
