import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { NewCategory } from "../NewCategory"

const setIsModalOpen = jest.fn()
jest.mock("../../../utils/SendDataApi", () => ({
  sendData: jest.fn(() => Promise.resolve({ ok: false }))
}))

describe('New category component', () => {
  beforeEach(() => {
    render(<NewCategory setIsModalOpen={setIsModalOpen}/>)
  })

  it('should render with 1 input and 1 button on the screen', () => {
    expect(screen.getByTestId('input-category')).toBeInTheDocument()
    expect(screen.getAllByRole('textbox')).toHaveLength(1)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button').innerHTML).toEqual('Inserir')
  })

  it('should update the value when typed', () => {
    const inputCategory = screen.getByTestId('input-category') as HTMLInputElement

    expect(inputCategory.value).toEqual('')

    fireEvent.change(inputCategory, { target: { value: 'Test category' }})

    expect(inputCategory.value).toEqual('Test category')
  })

  it('an error should appear in the input when clicking send without filling in the category', () => {
    const button = screen.getByRole('button')

    expect(() => screen.getByText('Categoria não pode ser vazia')).toThrow('Unable to find an element')

    fireEvent.click(button)

    expect(screen.getByText('Categoria não pode ser vazia')).toBeInTheDocument()
  })
  
  it('the popup should appear with the message "Ocorreu um erro interno!" when the api gives erro', async () => {
    const button = screen.getByRole('button')
    const inputName = screen.getByTestId('input-category') as HTMLInputElement

    act(() => {
      fireEvent.change(inputName, { target: { value: 'Test category' }})
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro interno!')).toBeInTheDocument()
    });
  })
})