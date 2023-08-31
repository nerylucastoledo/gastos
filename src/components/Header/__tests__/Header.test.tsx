import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../Header';

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => jest.fn()
}))

jest.spyOn(Storage.prototype, 'clear')
Storage.prototype.clear = jest.fn()

describe('Componente header', () => {
  beforeEach(() => {
    render( <Header />)
  })

  it('Nav should be contain button menu', () => {
    const btnMenu = screen.getByTestId('btnMenu')
    expect(btnMenu).toBeInTheDocument()
  })

  it('Nav should be contain button menu', () => {
    const btnMenu = screen.getByTestId('btnMenu')
    expect(btnMenu).toBeInTheDocument()
  })

  it('Logo should be visible', () => {
    expect(screen.getAllByRole('img')[0]).toBeTruthy()
  })

  it('should go back to the login screen and clear the localStorage when clicking exit', () => {
    const imgLogout = screen.getAllByRole('img')[1]
    fireEvent.click(imgLogout)

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(localStorage.clear).toHaveBeenCalled()
  })

  it('Nav should be contain Inserir cartão, Inserir categoria, Inserir pessoa, Meu perfil', () => {
    const menu = screen.getByRole('navigation')
    
    expect(menu).toBeInTheDocument()
    expect(screen.getByText('Inserir cartão')).toBeTruthy()
    expect(screen.getByText('Inserir categoria')).toBeTruthy()
    expect(screen.getByText('Inserir pessoa')).toBeTruthy()
    expect(screen.getByText('Meu perfil')).toBeTruthy()
  })

  it('should show modal when click insert card', async () => {
    const btnNewCard = screen.getAllByRole('button')[1]

    fireEvent.click(btnNewCard)
    expect(screen.getByText('Card')).toBeVisible()
  })

  it('should show modal when click insert category', async () => {
    const btnNewCard = screen.getAllByRole('button')[2]

    fireEvent.click(btnNewCard)
    expect(screen.getByText('Category')).toBeVisible()
  })

  it('should show modal when click insert people', async () => {
    const btnNewCard = screen.getAllByRole('button')[3]

    fireEvent.click(btnNewCard)
    expect(screen.getByText('People')).toBeVisible()
  })
})