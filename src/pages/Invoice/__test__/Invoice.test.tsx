import '@testing-library/jest-dom'
import { mockDataInvoice, mockNewBillDataUseDataByFilter } from "../../../mocks/MockData";
import { render, screen } from '@testing-library/react';
import { Invoice } from '../Invoice';
import { ThemeContextProvider } from '../../../Context/ThemeContext';


const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useParams: () => ({ name_card: 'Card 1' }),
}))

jest.mock("../../../hooks/useFecth", () => ({
  useFecth: jest.fn(() => mockDataInvoice)
}))

jest.mock("../../../Context/DataByFilters", () => ({
  useDataByFilter: jest.fn(() => mockNewBillDataUseDataByFilter)
}))

describe('Teste Invoice page', () => {
  beforeEach(() => {
    render(
      <ThemeContextProvider>
        <Invoice />
      </ThemeContextProvider>
    )
  })

  test('should show title of card', () => {
    expect(screen.getByText('Card 1')).toBeInTheDocument()
  })

  test('should only show 1 person to choose from: "Eu"', () => {
    const peoples = screen.getByTestId('invoice-people').children
    expect(peoples).toHaveLength(1)
    expect(screen.getByText('Eu')).toBeInTheDocument()
  })

  test('should show 6 items spent on the card by the person', () => {
    const invoice = screen.getByTestId('invoice-item').children
    expect(invoice).toHaveLength(6)
  })

  test('should show the total invoice to the person', () => {
    const totalInvoice = screen.getByTestId('invoice-total')
    expect(totalInvoice.innerHTML).toEqual('Total: R$&nbsp;60,00')
  })
})