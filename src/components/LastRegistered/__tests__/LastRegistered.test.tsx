import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { LastRegistered } from "../LastRegistered"
import { mockDataProps, mockWhithoutDataProps } from '../../../mocks/MockData'

describe('Last registered component with data', () => { 
  beforeEach(() => [
    render(<LastRegistered data={mockDataProps}/>)
  ])

  it('should show the last 3 registered', () => {
    const content = screen.getByTestId('last-registered')

    expect(content.children).toHaveLength(3)
  })
  
  it('all boxes should be filled in with the name of the item', () => {
    expect(screen.getByText('Teste item 1')).toBeInTheDocument()
    expect(screen.getByText('Teste item 2')).toBeInTheDocument()
    expect(screen.getByText('Teste item 3')).toBeInTheDocument()
  })

  it('all boxes should be filled in with the name of the card', () => {
    expect(screen.getByText('Nubank')).toBeInTheDocument()
    expect(screen.getByText('Picpay')).toBeInTheDocument()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })

  it('all boxes should be filled in with the correct value', () => {
    expect(screen.getByText('R$ 125,10')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.500,00')).toBeInTheDocument()
  })
})

describe('Last registered component without data', () => { 
  beforeEach(() => [
    render(<LastRegistered data={mockWhithoutDataProps}/>)
  ])

  it('should show the message "Você ainda não cadastrou um item"', () => {
    expect(screen.getByText('Nenhum cadastro ainda')).toBeInTheDocument()
  })
})