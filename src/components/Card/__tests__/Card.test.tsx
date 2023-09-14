import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Card } from '../Card'
import { mockDataProps, mockWhithoutDataProps } from '../../../mocks/MockData'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))


describe('Card component with data', () => {
  beforeEach(() => {
    render(<Card data={mockDataProps}/> )
  })

  it('should show picpay and samsung card', () => {
    const carousel = screen.getByTestId('carousel')

    expect(carousel.children).toHaveLength(3)
    expect(screen.getByText('Nubank')).toBeInTheDocument()
    expect(screen.getByText('Picpay')).toBeInTheDocument()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })

  it('should show card balance statements', () => {
    expect(screen.getByText('R$ 125,10')).toBeInTheDocument()
    expect(screen.getByText('R$ 2.000,00')).toBeInTheDocument()
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