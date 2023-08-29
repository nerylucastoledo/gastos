import React from 'react'
import Logo from '../../assets/img/logo.png'

import styles from './Login.module.css'
import { Input } from '../../components/input/Input'
import { NavLink } from 'react-router-dom'
import { Button } from '../../components/Button/Button'


export const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('email', email)
    console.log('password', password)
  }

  return (
    <div className={styles['container']}>
      <img className={styles['logo']} src={Logo} alt="Logo da empresa" />
      <p>Preencha as informções para acessar</p>

      <div className={styles['background']}>
        <form onSubmit={handleForm} className='form-inputs'>
          <h1>Faça o login</h1>
          
          <div>
            <Input
              label="" 
              type="email" 
              id="email" 
              placeholder="Digite seu email" 
              typeInput="border" 
              style={{ margin: '64px 0 32px' }}
              value={email}
              onChange={({currentTarget}) => setEmail(currentTarget.value)}
            />
            
            <Input 
              label="" 
              type="password" 
              id="password" 
              placeholder="Digite sua senha"
              typeInput="border" 
              value={password}
              onChange={({currentTarget}) => setPassword(currentTarget.value)}
            />
          </div>

          <div>
            <NavLink className={styles['link']} to={"/reset-password"}>Não lembra a senha?</NavLink>
          </div>

          <Button typeBtn='principal' style={{ margin: '32px auto 0' }}>Entrar</Button>
        </form>

        <div style={{ marginTop: '32px'}}>
          <p>Preencha as informções para acessar</p>
          
          <NavLink to={'/create-account'} style={{ textDecoration: 'none'}}>
            <Button typeBtn='principal' style={{ margin: '16px auto 0' }}>Entrar</Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
