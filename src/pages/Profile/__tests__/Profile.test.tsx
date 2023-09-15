import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { DataByFilterContextProvider } from "../../../Context/DataByFilters"
import { mockNewBillDataUseDataByFilter } from '../../../mocks/MockData'
import { Profile } from '../Profile'
import { act } from 'react-dom/test-utils'
import { ThemeContextProvider } from '../../../Context/ThemeContext'

const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

jest.mock("../../../hooks/useFecth", () => ({
  useFecth: jest.fn(() => mockNewBillDataUseDataByFilter)
}))

describe('New bill component with data', () => {
  beforeEach(() => {
    render(
      <DataByFilterContextProvider>
        <ThemeContextProvider>
          <Profile />
        </ThemeContextProvider>
      </DataByFilterContextProvider>
    )
  })

  it('should show the titles on the page', () => {
    expect(screen.getByText('Suas categorias')).toBeInTheDocument()
    expect(screen.getByText('Pessoas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('Cartões cadastradao')).toBeInTheDocument()
  })

  it('should show the salary input', () => {
    expect(screen.getByTestId('salary')).toBeInTheDocument()
    expect(screen.getByText('Seu salário')).toBeInTheDocument()
  })

  it('should show the save salary button when it is changed', () => {
    const input = screen.getByTestId('salary')
  
    act(() => {
      fireEvent.change(input, { target: { value: 2000 }})
    })

    waitFor(() => expect(screen.getByTestId('btn-save')).toThrow('Unable to find an element'))
  })

  it('should render 3 categorys', () => {
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Category 2')).toBeInTheDocument()
    expect(screen.getByText('Category 3')).toBeInTheDocument()
  })

  it('when clicking on the edit category button it should open the update modal', async () => {
    const itemEditOne = screen.getAllByAltText('Icon editar')[0]
    
    act(() => {
      fireEvent.click(itemEditOne)
    })

    await waitFor(() => {
      const inputEdit = screen.getByTestId('input-name') as HTMLInputElement

      expect(screen.getByTestId('form-category')).toBeInTheDocument()
      expect(inputEdit).toBeInTheDocument()
      expect(inputEdit.value).toEqual('Category 1')
    })
  })

  it('should open the delete modal when clicking on edit any category', async () => {
    const itemDeleteOne = screen.getAllByAltText('Icon deletar')[0]
    
    act(() => {
      fireEvent.click(itemDeleteOne)
    })

    await waitFor(() => {
      expect(screen.getByTestId('information-message')).toBeInTheDocument()
      expect(screen.getByTestId('information-message').innerHTML)
      .toEqual('Dados com esse nome serão deletados. <br> Tem certeza que quer deletar o(a) <b>Category 1</b>?')
    })
  })

  it('should render 3 peoples', () => {
    expect(screen.getByText('People 1')).toBeInTheDocument()
    expect(screen.getByText('People 2')).toBeInTheDocument()
    expect(screen.getByText('People 3')).toBeInTheDocument()
  })

  it('should render 3 cards', () => {
    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Card 3')).toBeInTheDocument()
  })
})