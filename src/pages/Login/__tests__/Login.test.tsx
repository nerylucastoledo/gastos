import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Login } from '../Login'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe('Login page', () => {
  it('should render with w inputs on screen', () => {
    render(<Login />)

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Senha')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('should render with 1 create and access button', () => {
    render(<Login />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByText('Entrar')).toHaveAttribute('id', 'login')
    expect(screen.getByText('Criar conta')).toHaveAttribute('id', 'create')
  })

  it('should change the route when clicking on access or create', () => {
    render(<Login />)

    const btnCreate = screen.getAllByRole('button')[1]
    fireEvent.click(btnCreate)
    expect(navigate).toHaveBeenCalledTimes(1)
  })

  it('should change input values ​​when typing', () => {
    render(<Login />)

    const emailInputElement = screen.getByPlaceholderText('Email') as HTMLInputElement
    const passwordInputElement = screen.getByPlaceholderText('Senha') as HTMLInputElement

    expect(emailInputElement.value).toEqual("")
    expect(passwordInputElement.value).toEqual("")

    fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInputElement, { target: { value: '12345678' } })
    
    expect(emailInputElement.value).toBe('test@test.com')
    expect(passwordInputElement.value).toBe('12345678')
  })
})