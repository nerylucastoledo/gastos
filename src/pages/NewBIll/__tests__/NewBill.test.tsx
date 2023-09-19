import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { DataByFilterContextProvider } from "../../../Context/DataByFilters"
import { NewBill } from "../NewBill"
import { act } from "react-dom/test-utils"
import { mockNewBillDataUseDataByFilter } from '../../../mocks/MockData'
import { ThemeContextProvider } from '../../../Context/ThemeContext'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

jest.mock("../../../hooks/useFecth", () => ({
  useFecth: jest.fn(() => mockNewBillDataUseDataByFilter)
}))

jest.mock("../../../utils/SendDataApi", () => ({
  sendData: jest.fn(() => Promise.resolve({ ok: false }))
}))

describe('New bill component with data', () => {
  beforeEach(() => {
    render(
      <DataByFilterContextProvider>
        <ThemeContextProvider>
          <NewBill />
        </ThemeContextProvider>
      </DataByFilterContextProvider>
    )
  })

  it('should render with 9 inputs on the screen', () => {
    expect(screen.getByTestId('month-selected')).toBeInTheDocument()
    expect(screen.getByTestId('year-selected')).toBeInTheDocument()
    expect(screen.getByTestId('item-input')).toBeInTheDocument()
    expect(screen.getByTestId('description-input')).toBeInTheDocument()
    expect(screen.getByTestId('card-selected')).toBeInTheDocument()
    expect(screen.getByTestId('people-selected')).toBeInTheDocument()
    expect(screen.getByTestId('category-selected')).toBeInTheDocument()
    expect(screen.getByTestId('value-input')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox-installment')).toBeInTheDocument()
  })

  it('should render with 1 button on the screen', () => {
    expect(screen.getAllByRole('button')[6].innerHTML).toEqual('Cadastrar')
  })

  it('should show the installment quantity input when selecting the checkbox', () => {
    const checkbox = screen.getByTestId('checkbox-installment') as HTMLInputElement

    expect(checkbox.checked).toEqual(false)

    act(() => {
      fireEvent.click(checkbox)
    })

    expect(screen.getByTestId('installment-input')).toBeInTheDocument()
  })

  it('should show error paragraphs in inputs when not filled in', () => {
    const btnSend = screen.getAllByRole('button')[6]
    const checkbox = screen.getByTestId('checkbox-installment') as HTMLInputElement

    act(() => {
      fireEvent.click(checkbox)
      fireEvent.click(btnSend)
    })

    expect(screen.getByText('Preencha o nome')).toBeInTheDocument()
    expect(screen.getByText('Preencha o valor')).toBeInTheDocument()
    expect(screen.getByText('Parcela deve ser maior que 1')).toBeInTheDocument()
  })

  it('should change the values ​​when filled', () => {
    const selecteMonth = screen.getByTestId('month-selected') as HTMLInputElement
    const selectYear = screen.getByTestId('year-selected') as HTMLInputElement
    const inputItem = screen.getByTestId('item-input') as HTMLInputElement
    const descriptionItem = screen.getByTestId('description-input') as HTMLInputElement
    const selectCard = screen.getByTestId('card-selected') as HTMLInputElement
    const selectPeople = screen.getByTestId('people-selected') as HTMLInputElement
    const selecteCategory = screen.getByTestId('category-selected') as HTMLInputElement
    const inputValue = screen.getByTestId('value-input') as HTMLInputElement

    expect(selecteMonth.value).toEqual('Setembro')
    expect(selectYear.value).toEqual('2023')
    expect(inputItem.value).toEqual('')
    expect(descriptionItem.value).toEqual('')
    expect(selectCard.value).toEqual('Card 1')
    expect(selectPeople.value).toEqual('Eu')
    expect(selecteCategory.value).toEqual('Category 1')
    expect(inputValue.value).toEqual('')

    act(() => {
      fireEvent.change(selecteMonth, { target: { value: 'Janeiro' }})
      fireEvent.change(selectYear, { target: { value: '2022' }})
      fireEvent.change(inputItem, { target: { value: 'Teste' }})
      fireEvent.change(descriptionItem, { target: { value: 'Description' }})
      fireEvent.change(selectCard, { target: { value: 'Card 1' }})
      fireEvent.change(selectPeople, { target: { value: 'People 1' }})
      fireEvent.change(selecteCategory, { target: { value: 'Category 1' }})
      fireEvent.change(inputValue, { target: { value: 200 }})
    })

    expect(selecteMonth.value).toEqual('Janeiro')
    expect(selectYear.value).toEqual('2022')
    expect(inputItem.value).toEqual('Teste')
    expect(descriptionItem.value).toEqual('Description')
    expect(selectCard.value).toEqual('Card 1')
    expect(selectPeople.value).toEqual('People 1')
    expect(selecteCategory.value).toEqual('Category 1')
    expect(inputValue.value).toEqual("200")
  })

  it('the popup should appear with the message "Ocorreu um erro interno, tente novamente mais tarde" when the api gives error', async () => {
    const button = screen.getByText('Cadastrar')

    const selecteMonth = screen.getByTestId('month-selected') as HTMLInputElement
    const selectYear = screen.getByTestId('year-selected') as HTMLInputElement
    const inputItem = screen.getByTestId('item-input') as HTMLInputElement
    const descriptionItem = screen.getByTestId('description-input') as HTMLInputElement
    const selectCard = screen.getByTestId('card-selected') as HTMLInputElement
    const selectPeople = screen.getByTestId('people-selected') as HTMLInputElement
    const selecteCategory = screen.getByTestId('category-selected') as HTMLInputElement
    const inputValue = screen.getByTestId('value-input') as HTMLInputElement

    act(() => {
      fireEvent.change(selecteMonth, { target: { value: 'Janeiro' }})
      fireEvent.change(selectYear, { target: { value: '2022' }})
      fireEvent.change(inputItem, { target: { value: 'Teste' }})
      fireEvent.change(descriptionItem, { target: { value: 'Description' }})
      fireEvent.change(selectCard, { target: { value: 'Card 1' }})
      fireEvent.change(selectPeople, { target: { value: 'People 1' }})
      fireEvent.change(selecteCategory, { target: { value: 'Category 1' }})
      fireEvent.change(inputValue, { target: { value: 200 }})
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro interno!')).toBeInTheDocument()
    })
  })
})