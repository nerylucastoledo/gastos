import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Ranking } from "../Ranking"
import { mockDataRanking, mockWhithoutDataProps } from "../../../mocks/MockData"

describe('Ranking component with data', () => {
  beforeEach(() => {
    render(<Ranking data={mockDataRanking}/>)
  })

  it('should show 4 items in ranking', () => {
    const boxContent = screen.getByTestId('ranking')
    expect(boxContent.children).toHaveLength(4)
  })

  it('they should be ranked from the highest spending to the lowest and with their titles inside the card', () => {
    const boxContent = screen.getByTestId('ranking')

    expect(boxContent.children[0].innerHTML.includes('Comida')).toBeTruthy()
    expect(boxContent.children[1].innerHTML.includes('Shopping')).toBeTruthy()
    expect(boxContent.children[2].innerHTML.includes('Teste de categoria')).toBeTruthy()
    expect(boxContent.children[3].innerHTML.includes('Carro')).toBeTruthy()
  })

  it('should show the value inside the card of each item', () => {
    expect(screen.getByText('R$ 14.500,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 10.000,00')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.625,10')).toBeInTheDocument()
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()
  })
})

describe('Ranking component without data', () => {
  beforeEach(() => {
    render(<Ranking data={mockWhithoutDataProps}/>)
  })

  it('should show the text "Ranking indisponível no momento"', () => {
    expect(screen.getByText('Ranking indisponível no momento')).toBeInTheDocument()
  })
})