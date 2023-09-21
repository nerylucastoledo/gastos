import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockNewBillDataUseDataByFilter } from "../../../mocks/MockData";
import { Report } from "../Report";
import { DataByFilterContextProvider } from '../../../Context/DataByFilters';
import { ThemeContextProvider } from '../../../Context/ThemeContext';

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

jest.mock("../../../hooks/useFecth", () => ({
  useFecth: jest.fn(() => mockNewBillDataUseDataByFilter)
}))

describe('Teste report component', () => {
  beforeEach(() => {
    render(
      <DataByFilterContextProvider>
        <ThemeContextProvider>
          <Report />
        </ThemeContextProvider>
      </DataByFilterContextProvider>
    )
  })

  it('should be show title "Relatório mensal"', () => {
    expect(screen.getByText('Relatório mensal')).toBeInTheDocument()
  })

  it('should be show filter of month and year', () => {
    const selectMonth = screen.getByTestId('select-month') as HTMLSelectElement
    const selectYear = screen.getByTestId('select-year') as HTMLSelectElement

    expect(selectMonth).toBeInTheDocument()
    expect(selectYear).toBeInTheDocument()

    expect(selectMonth.value).toEqual('Setembro')
    expect(selectYear.value).toEqual('2023')
  })

  it('should be show a table with invoice of which people', () => {
    expect(screen.getByRole('table')).toBeInTheDocument()

    expect(screen.getByText('Eu')).toBeInTheDocument()
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument()
  })

  it('should change the select value when the user changes', async () => {
    const selectMonth = screen.getByTestId('select-month') as HTMLSelectElement
    const selectYear = screen.getByTestId('select-year') as HTMLSelectElement

    expect(screen.getByText('Eu')).toBeInTheDocument()
    expect(screen.getByText('R$ 300,00')).toBeInTheDocument()

    act(() => {
      fireEvent.change(selectMonth, { target: { value: 'Fevereiro' }})
      fireEvent.change(selectYear, { target: { value: '2022' }})
    })

    await waitFor(() => {
      expect(selectMonth.value).toEqual('Fevereiro')
      expect(selectYear.value).toEqual('2022')
    })
  })
})