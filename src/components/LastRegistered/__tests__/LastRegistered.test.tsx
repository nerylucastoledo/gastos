import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { LastRegistered } from "../LastRegistered"

const mockDataProps = {
  "salary": 3757,
  "name": "Lucas",
  "content": [
    {
      "item": "Teste item 1",
      "value": 125.1,
      "description": "Teste de descrição",
      "card": "Nubank",
      "people": "Eu",
      "category": "Teste de categoria"
    },
    {
      "item": "Teste item 2",
      "value": 2000,
      "description": "Teste de descrição",
      "card": "Picpay",
      "people": "Eu",
      "category": "Teste de categoria"
    },
    {
      "item": "Teste item 3",
      "value": 2500,
      "description": "Teste de descrição",
      "card": "Samsung",
      "people": "Teste de pessoa",
      "category": "Teste de categoria"
    }
  ],
  "cardList": [
    {
      "id": 603,
      "name": "Nubank",
      "username": "LucasNery260196",
      "color": "purple"
    },
    {
      "id": 652,
      "name": "Samsung",
      "username": "LucasNery260196",
      "color": "black"
    },
    {
      "id": 653,
      "name": "Picpay",
      "username": "LucasNery260196",
      "color": "green"
    }
  ],
  "peopleList": [],
  "categoryList": []
}

const mockWhithoutDataProps = {
  "salary": 3757,
  "name": "Lucas",
  "content": [],
  "cardList": [],
  "peopleList": [],
  "categoryList": []
}

describe('Last registered component with data', () => { 
  beforeEach(() => [
    render(<LastRegistered data={mockDataProps}/>)
  ])

  it('deveria mostrar os 3 ultimos cadastrados', () => {
    const content = screen.getByTestId('last-registered')

    expect(content.children).toHaveLength(3)
  })
  
  it('todas as boxs deveriam estar preenchidas com o nome do item', () => {
    expect(screen.getByText('Teste item 1')).toBeInTheDocument()
    expect(screen.getByText('Teste item 2')).toBeInTheDocument()
    expect(screen.getByText('Teste item 3')).toBeInTheDocument()
  })

  it('todas as boxs deveriam estar preenchidas com o nome do cartão', () => {
    expect(screen.getByText('Nubank')).toBeInTheDocument()
    expect(screen.getByText('Picpay')).toBeInTheDocument()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })

  it('todas as boxs deveriam estar preenchidas com o valor correto', () => {
    expect(screen.getByText('R$ 125,10')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.500,00')).toBeInTheDocument()
  })
})

describe('Last registered component without data', () => { 
  beforeEach(() => [
    render(<LastRegistered data={mockWhithoutDataProps}/>)
  ])

  it('deveria mostrar a mensagem "Você ainda não cadastrou um item"', () => {
    expect(screen.getByText('Você ainda não cadastrou um item')).toBeInTheDocument()
  })
})