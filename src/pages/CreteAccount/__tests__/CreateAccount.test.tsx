import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { CreateAccount } from "../CreateAccount";

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

describe('Create account page', () => {
  it('should render with 5 inputs on screen', () => {
    render(<CreateAccount />)

    const nameInput = screen.getByPlaceholderText('Nome')
    const lastnameInput = screen.getByPlaceholderText('Sobrenome')
    const salaryInput = screen.getByPlaceholderText('Salário')
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Senha')

    expect(nameInput).toBeInTheDocument()
    expect(lastnameInput).toBeInTheDocument()
    expect(salaryInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })

  it('should render with 1 create and access button', () => {
    render(<CreateAccount />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByText('Criar')).toHaveAttribute('id', 'criar')
    expect(screen.getByText('Acessar')).toHaveAttribute('id', 'acessar')
  })

  it('should change the route when clicking on access or create', () => {
    render(<CreateAccount />)

    const btnAcessar = screen.getAllByRole('button')[1]
    fireEvent.click(btnAcessar)
    expect(navigate).toHaveBeenCalledTimes(1)
  })

  it('should change input values ​​when typing', () => {
    render(<CreateAccount />)

    const nameInputElement = screen.getByPlaceholderText('Nome') as HTMLInputElement
    const lastnameInputElement = screen.getByPlaceholderText('Sobrenome') as HTMLInputElement
    const salaryInputElement = screen.getByPlaceholderText('Salário') as HTMLInputElement
    const emailInputElement = screen.getByPlaceholderText('Email') as HTMLInputElement
    const passwordInputElement = screen.getByPlaceholderText('Senha') as HTMLInputElement

    expect(nameInputElement.value).toEqual("")
    expect(lastnameInputElement.value).toEqual("")
    expect(salaryInputElement.value).toEqual("")
    expect(emailInputElement.value).toEqual("")
    expect(passwordInputElement.value).toEqual("")

    fireEvent.change(nameInputElement, { target: { value: 'Lucas' } })
    fireEvent.change(lastnameInputElement, { target: { value: 'Nery' } })
    fireEvent.change(salaryInputElement, { target: { value: 10 }})
    fireEvent.change(emailInputElement, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInputElement, { target: { value: '12345678' } })

    expect(nameInputElement.value).toBe('Lucas')
    expect(lastnameInputElement.value).toBe('Nery')
    expect(salaryInputElement.value).toBe("10")
    expect(emailInputElement.value).toBe('test@test.com')
    expect(passwordInputElement.value).toBe('12345678')
  })
})