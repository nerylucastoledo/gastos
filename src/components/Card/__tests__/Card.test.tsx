import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

const mockDataProps = {
  "salary": 3757,
  "name": "Lucas",
  "content": [
    {
      "item": "Teste item",
      "value": 125.1,
      "description": "Teste de descrição",
      "card": "Picpay",
      "people": "Eu",
      "category": "Teste de categoria"
    },
    {
      "item": "Teste item",
      "value": 2000,
      "description": "Teste de descrição",
      "card": "Picpay",
      "people": "Eu",
      "category": "Teste de categoria"
    },
    {
      "item": "Teste item",
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

describe('Card component with data', () => {
  beforeEach(() => {
    render(<Card data={mockDataProps}/> )
  })

  it('should show picpay and samsung card', () => {
    const carousel = screen.getByTestId('carousel')

    expect(carousel.children).toHaveLength(2)
    expect(screen.getByText('Picpay')).toBeInTheDocument()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })

  it('should show card balance statements', () => {
    expect(screen.getByText('R$ 2.125,10')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.500,00')).toBeInTheDocument()
  })
})

describe('Card component without data', () => {
  beforeEach(() => {
    render(<Card data={mockWhithoutDataProps}/> )
  })

  it('carousel should not have any children when data is empty', () => {
    const carousel = screen.getByTestId('carousel')

    expect(carousel.children).toHaveLength(0)
  })
})