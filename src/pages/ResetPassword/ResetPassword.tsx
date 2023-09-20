import { useState } from 'react'
import Logo from '../../assets/img/dark.png'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import styles from './ResetPassword.module.css'

export const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSUbmit = () => {
    if (!email.length) setError('email')
  }

  return (
    <div className='login-container'>
      <img width={130} height={88} className='logo-center' src={Logo} alt="Logo da empresa" />
      
      <div className={styles['content']}>
        <h1>Resetar a senha</h1>
        <p className={'paragraph-default'} style={{ textAlign: 'start', marginTop: '12px' }}>
          Digite abaixo o e-mail que você cadastrou para receber um link com as instruções para resetar a senha
        </p>

        <div>
          <Input
            label="" 
            type="email" 
            id="email" 
            name="email"
            placeholder="Digite seu email" 
            typeInput="normal"
            value={email}
            onChange={({currentTarget}) => setEmail(currentTarget.value)}
            style={{ border: error === 'email' ? '1px solid red' : 'unset', marginTop: '32px', width: '100%' }}
          />
          {error === 'email' && <p className="error-input" style={{ justifyContent: 'center', marginTop: '12px', fontSize: '16px' }}>Email não pode ser vazio</p>}
        </div>

        <div className={styles['box-final']}>
          <p style={{ textAlign: 'center' }}>
            Lembrou a senha?
            <a href="/login" className={styles['link']}>Login</a>
          </p>

          <Button typeBtn='principal' onClick={() => handleSUbmit()} style={{ display: 'block', margin: '16px auto 0' }}>Enviar</Button>
        </div>
      </div>
    </div>
  )
}
