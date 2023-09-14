import React, { useState } from "react"
import Logo from '../../assets/img/logo.png'

import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { Popup } from "../../components/Popup/Popup"
import { sendData } from "../../utils/SendDataApi"

export const CreateAccount = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [lastname, setLastName] = useState('')
  const [salary, setSalary] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorFields, setErrorFields] = useState<string[]>([])

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorFields([])

    if (!name.length) setErrorFields((previous) => [...previous, 'name'])
    if (!lastname.length) setErrorFields((previous) => [...previous, 'lastname'])
    if (!salary.length) setErrorFields((previous) => [...previous, 'salary'])
    if (!email.length) setErrorFields((previous) => [...previous, 'email'])
    if (password.length <= 7) setErrorFields((previous) => [...previous, 'password'])

    if (name.length && lastname.length && salary.length && email.length && password.length >= 8) {
      const config = {
        method: 'POST',
        body: JSON.stringify({
          name,
          lastname,
          salary: Number(salary).toFixed(2),
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }

      const response = sendData('http://localhost:8080/user/create', { ...config })
      response.then((res) => {
        if (!res.ok) {
          if (res.status === 500) throw new Error('email')
          setError('Ocorreu um erro interno, tente novamente!')
          setTimeout(() => setError(''), 2000)
        }
        
        navigate('/login')
      })
      .catch(({ message }) => setErrorFields([message]))
    }
  }

  return (
    <div className='login-container'>
      {error.length ? <Popup>{error}</Popup> : null}

      <img className='logo-center' src={Logo} alt="Logo da empresa" />
        <form onSubmit={handleForm} className='form-inputs'>
          <h1>Criar conta</h1>
          
        <div>
          <div style={{ margin: '64px 0 32px' }}>
            <Input
              label="" 
              type="text" 
              id="name"
              name="name" 
              placeholder="Nome" 
              typeInput="border" 
              value={name}
              onChange={({currentTarget}) => setName(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('name') ? 'var(--color-error)' : 'unset'}}
            />
            {errorFields.includes('name') && <p className="error-input ">Preencha o nome</p>}
          </div>

          <div style={{ marginBottom: '32px' }}>
            <Input
              label="" 
              type="text" 
              id="lastname" 
              name="lastname"
              placeholder="Sobrenome" 
              typeInput="border" 
              value={lastname}
              onChange={({currentTarget}) => setLastName(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('lastname') ? 'var(--color-error)' : 'unset'}}
            />
            {errorFields.includes('lastname') && <p className="error-input ">Preencha o sobrenome</p>}
          </div>

          <div style={{ marginBottom: '32px' }}>
            <Input
              label="" 
              type="number" 
              id="salary" 
              name="salary"
              placeholder="Salário" 
              typeInput="border" 
              value={salary}
              onChange={({currentTarget}) => setSalary(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('salary') ? 'var(--color-error)' : 'unset'}}
            />
            {errorFields.includes('salary') && <p className="error-input ">Preencha o salário</p>}
          </div>

          <div  style={{ marginBottom: '32px' }}>
            <Input
              label="" 
              type="email" 
              id="email" 
              name="email"
              placeholder="Email" 
              typeInput="border"
              value={email}
              onChange={({currentTarget}) => setEmail(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('email') ? 'var(--color-error)' : 'unset'}}
            />
            {errorFields.includes('email') && <p className="error-input ">Email vazio ou já utilizado</p>}
          </div>

          <div>
            <Input 
              label="" 
              type="password" 
              id="password" 
              name="password"
              placeholder="Senha"
              typeInput="border" 
              value={password}
              autoComplete='on'
              onChange={({currentTarget}) => setPassword(currentTarget.value)}
              style={{ borderBottomColor: errorFields.includes('password') ? 'var(--color-error)' : 'unset'}}
            />
            {errorFields.includes('password') && <p className="error-input ">Senha deve ter 8 caracteres</p>}
          </div>
        </div>

        <Button typeBtn='principal' id="criar" style={{ margin: '32px auto 0' }}>Criar</Button>
      </form>

      <p className='paragraph-default' style={{ marginTop: '32px', marginBottom: '16px' }}>Já possui conta?</p>
      
      <Button 
        onClick={() => navigate('/login')} 
        typeBtn='principal' 
        id="acessar" 
        style={{ margin: '0 auto 0' }}
      >
        Acessar
      </Button>
    </div>
  )
}
