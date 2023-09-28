import { useEffect, useState } from 'react'
import Logo from '../../assets/img/dark.png'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import styles from './ResetPassword.module.css'
import { sendData } from '../../utils/SendDataApi'
import { Popup } from '../../components/Popup/Popup'
import Success from '../../assets/img/success.png'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

export const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [errorApi, setErrorApi] = useState('')
  const [success, setSuccess] = useState(false)
  const [countdownValue, setCountdownValue] = useState(3)
  const navigate = useNavigate()

  const handleSUbmit = () => {
    setError('')
    if (!email.length) return setError('email')

    const response = sendData(`${process.env.VITE_DEFAULT_URL}user/${email}`, {
      method: 'GET'
    })

    response.then(async (res) => {
      const json = await res.json().then(json => json)

      if (json.username && json.id) {
        const template_params = {
          from_name: 'Seus gastos',
          message: `https://seusgastos.vercel.app/reset-password/${json.username}`,
          email: email
        }
    
        emailjs.send(process.env.VITE_SERVICE_ID ?? '', process.env.VITE_TEMPLATE_ID ?? '', template_params, process.env.VITE_PUBLIC_KEY)
        .then(() => {
          countdown()
          return setSuccess(true)
        })
        .catch(() => {
          setErrorApi('Tivemos um problema no envio do e-mail, tente novamente mais tarde!')
          setTimeout(() => setErrorApi(''), 2000)
        })

        return
      }

      if (json.status == 401) {
        throw new Error(json.message)
      }

      throw new Error("Ocorreu um erro interno!")
    })
    .catch(({ message }) => {
      setErrorApi(message)
      setTimeout(() => setErrorApi(''), 2000)
    })
  }

  const countdown = () => {
    setInterval(() => setCountdownValue((cont) => cont - 1), 1000)
  }

  useEffect(() => {
    countdownValue === 0 && navigate('/login')
  }, [countdownValue])

  return (
    <div className='login-container'>
      {errorApi && (
        <Popup>
          {errorApi}
        </Popup>
      )}

      <img width={130} height={88} className='logo-center' src={Logo} alt="Logo da empresa" />
      
      <div className={styles['content']}>
        {!success ? (
          <>
            <h1>Resetar a senha</h1>
            <p className={'paragraph-default'} style={{ textAlign: 'start', marginTop: '12px' }}>
              Digite abaixo o e-mail que você cadastrou para receber um link com as instruções para resetar a senha
            </p>

            <div style={{ marginTop: '16px'}}>
              <Input 
                label={`Seu email`}
                typeInput="normal" 
                placeholder="Digite o email" 
                type="email"
                data-testid='input-email'
                value={email}
                onChange={({ currentTarget }) => setEmail(currentTarget.value)}
                style={{ width: '100%', marginTop: '6px', border: error ? '1px solid var(--color-error)' : 'unset' }}
                styleLabel={{ color: 'var(--color-5)', fontWeight: 'bold' }}
              />
              {error && <p className="error-input">Email não pode ser vazia</p>}
            </div>

            <div className={styles['box-final']}>
              <p style={{ textAlign: 'center' }}>
                Lembrou a senha?
                <a href="/login" className={styles['link']}>Login</a>
              </p>

              <Button typeBtn='principal' onClick={() => handleSUbmit()} style={{ display: 'block', margin: '16px auto 0' }}>Enviar</Button>
            </div>
          </>
        ) : (
          <div className={styles['box-sendMail']}>
            <img src={Success} alt="Icone de sucesso" />
            <p className='paragraph-default'>E-mail enviado com sucesso! <br></br> Dê uma olhada no link que enviamos</p>
            <Button disabled={true} style={{ display: 'block', margin: '0 auto'}} typeBtn='accepted'>Voltando {countdownValue}</Button>
          </div>
        )}

      </div>
    </div>
  )
}
