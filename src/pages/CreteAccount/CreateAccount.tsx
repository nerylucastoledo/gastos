import React from "react"
import Logo from '../../assets/img/logo.png'

import { NavLink } from "react-router-dom"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/input/Input"
import { Popup } from "../../components/Popup/Popup"

export const CreateAccount = () => {
  const [name, setName] = React.useState('')
  const [lastname, setLastName] = React.useState('')
  const [salary, setSalary] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [errorFields, setErrorFields] = React.useState<string[]>([])

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorFields([])

    if (!name.length) setErrorFields((previous) => [...previous, 'name'])
    if (!lastname.length) setErrorFields((previous) => [...previous, 'lastname'])
    if (!salary.length) setErrorFields((previous) => [...previous, 'salary'])
    if (!email.length) setErrorFields((previous) => [...previous, 'email'])
    if (password.length <= 7) setErrorFields((previous) => [...previous, 'password'])

    if (name.length && lastname.length && salary.length && email.length && password.length >= 8) {
      fetch('http://localhost:8080/user/create', {
        method: 'POST',
        body: JSON.stringify({
          name,
          lastname,
          salary,
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (!res.ok && res.status === 500) {
          throw new Error("email")
        } else {
          setError('Ocorreu um erro interno, tente novamente!')
          setTimeout(() => {
            setError('')
          }, 2000);
        }
      })
      .catch(() => setErrorFields(["email"]))
    }
  }

  return (
    <div className='login-container'>
      {error.length ? <Popup>{error}</Popup> : null}

      <img className='logo-center' src={Logo} alt="Logo da empresa" />
      <div className='background'>
        <form onSubmit={handleForm} className='form-inputs'>
          <h1>Criar conta</h1>
          
          <div>
            <div style={{ margin: '64px 0 32px' }}>
              <Input
                label="" 
                type="text" 
                id="name" 
                placeholder="Nome" 
                typeInput="border" 
                value={name}
                onChange={({currentTarget}) => setName(currentTarget.value)}
                style={{ borderBottomColor: errorFields.includes('name') ? 'red' : 'unset'}}
              />
              {errorFields.includes('name') && <p className="error-input ">Preencha o nome</p>}
            </div>

            <div style={{ marginBottom: '32px' }}>
              <Input
                label="" 
                type="text" 
                id="lastname" 
                placeholder="Sobrenome" 
                typeInput="border" 
                value={lastname}
                onChange={({currentTarget}) => setLastName(currentTarget.value)}
                style={{ borderBottomColor: errorFields.includes('lastname') ? 'red' : 'unset'}}
              />
              {errorFields.includes('lastname') && <p className="error-input ">Preencha o sobrenome</p>}
            </div>

            <div style={{ marginBottom: '32px' }}>
              <Input
                label="" 
                type="number" 
                id="salary" 
                placeholder="Salário" 
                typeInput="border" 
                value={salary}
                onChange={({currentTarget}) => setSalary(currentTarget.value)}
                style={{ borderBottomColor: errorFields.includes('salary') ? 'red' : 'unset'}}
              />
              {errorFields.includes('salary') && <p className="error-input ">Preencha o salário</p>}
            </div>

            <div  style={{ marginBottom: '32px' }}>
              <Input
                label="" 
                type="email" 
                id="email" 
                placeholder="Email" 
                typeInput="border" 
                value={email}
                onChange={({currentTarget}) => setEmail(currentTarget.value)}
                style={{ borderBottomColor: errorFields.includes('email') ? 'red' : 'unset'}}
              />
              {errorFields.includes('email') && <p className="error-input ">Email vazio ou já utilizado</p>}
            </div>

            <div>
              <Input 
                label="" 
                type="password" 
                id="password" 
                placeholder="Senha"
                typeInput="border" 
                value={password}
                onChange={({currentTarget}) => setPassword(currentTarget.value)}
                style={{ borderBottomColor: errorFields.includes('password') ? 'red' : 'unset'}}
              />
              {errorFields.includes('password') && <p className="error-input ">Senha deve ter 8 caracteres</p>}
            </div>
          </div>

          <Button typeBtn='principal' style={{ margin: '32px auto 0' }}>Entrar</Button>
        </form>

        <div style={{ marginTop: '32px'}}>
          <p className='paragraph-default'>Já possui conta?</p>
          
          <NavLink to={'/login'} style={{ textDecoration: 'none'}}>
            <Button typeBtn='principal' style={{ margin: '16px auto 0' }}>Acessar</Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
