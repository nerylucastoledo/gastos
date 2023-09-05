import React, { useState } from "react"
import Logo from '../../assets/img/logo.png'

import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/input/Input"
import { Popup } from "../../components/Popup/Popup"
import { sendData } from "../../utils/SendDataApi"

export const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorFields, setErrorFields] = useState<string[]>([])

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorFields([])

    if (!email.length) setErrorFields((previous) => [...previous, 'email'])
    if (password.length < 8) setErrorFields((previous) => [...previous, 'password'])
    if (email.length && password.length >= 8) {

      const config = {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
        'Content-Type': 'application/json',
        },
      }

      const response = sendData('http://localhost:8080/user/login', { ...config })
      response.then(async (res) => {
        const json = await res.json().then(json => json)
        if (json.username) {
          window.localStorage.setItem('username', json.username)
          return navigate('/')
        }
        if (json.status === 401) throw new Error(json.message)
        if (!res.ok) throw new Error("Ocorreu um erro interno!")
      })
      .catch(({ message }) => {
        setError(message)
        setTimeout(() => setError(''), 2000)
      })
    }
  }

  return (
    <div className='login-container'>
      {error.length ? <Popup>{error}</Popup> : null}

      <img className='logo-center' src={Logo} alt="Logo da empresa" />
      <p className='paragraph-default'>Preencha as informações para acessar</p>

      <form onSubmit={handleForm} className='form-inputs'>
        <h1>Faça o login</h1>

        <div>
          <div style={{ margin: '64px 0 32px' }}>
            <Input
              label="" 
              type="email" 
              id="email" 
              name="email"
              placeholder="Digite seu email" 
              typeInput="border"
              value={email}
              onChange={({currentTarget}) => setEmail(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('email') ? 'red' : 'unset'}}
            />
            {errorFields.includes('email') && <p className="error-input ">Email não pode ser vazio</p>}
          </div>

          <div>
            <Input 
              label="" 
              type="password" 
              id="password" 
              name="password"
              placeholder="Digite a senha"
              typeInput="border" 
              value={password}
              autoComplete='on'
              onChange={({currentTarget}) => setPassword(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('password') ? 'red' : 'unset'}}
            />
            {errorFields.includes('password') && <p className="error-input ">Senha deve ter 8 caracteres</p>}
          </div>

          <a href={'/reset-password'}>Não lembra a senha?</a>
        </div>

        <Button typeBtn='principal' id="login" style={{ margin: '32px auto 0' }}>Entrar</Button>
      </form>

      <p className='paragraph-default' style={{ marginTop: '32px', marginBottom: '16px' }}>Não tem uma conta?</p>

      <div>
        <Button 
          onClick={() => navigate('/create-account')} 
          typeBtn='principal' 
          id="create" 
          style={{ margin: '0 auto 0' }}
        >
          Criar conta
        </Button>
      </div>
    </div>
  )
}
