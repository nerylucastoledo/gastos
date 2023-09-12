import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { NewCard } from "../NewCard"
import { DataByFilterContextProvider } from '../../../Context/DataByFilters'

const setIsModalOpen = jest.fn()
jest.mock("../../../utils/SendDataApi", () => ({
  sendData: jest.fn(() => Promise.resolve({ ok: false }))
}))

describe('New card component', () => {
  beforeEach(() => {
    render(
      <DataByFilterContextProvider>
        <NewCard setIsModalOpen={setIsModalOpen}/>
      </DataByFilterContextProvider>
    )
  })

  it('should render with 2 inputs on the screen', () => {
    expect(screen.getByTestId('input-name')).toBeInTheDocument()
    expect(screen.getByTestId('input-color')).toBeInTheDocument()
  })

  it('should render with 1 button on the screen', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button').innerHTML).toEqual('Inserir')
  })

  it('should update the value when typed', () => {
    const inputName = screen.getByTestId('input-name') as HTMLInputElement
    const inputColor = screen.getByTestId('input-color') as HTMLInputElement

    expect(inputName.value).toEqual('')
    expect(inputColor.value).toEqual('#000000')

    fireEvent.change(inputName, { target: { value: 'Test card' }})
    fireEvent.change(inputColor, { target: { value: '#ffffff' }})

    expect(inputName.value).toEqual('Test card')
    expect(inputColor.value).toEqual('#ffffff')
  })

  it('an error should appear in the input when clicking send without filling in the name', () => {
    const button = screen.getByRole('button')

    expect(() => screen.getByText('Nome não pode ser vazio')).toThrow('Unable to find an element')

    fireEvent.click(button)

    expect(screen.getByText('Nome não pode ser vazio')).toBeInTheDocument()
  })
  
  it('the popup should appear with the message "Ocorreu um erro interno!" when the api gives error', async () => {
    const button = screen.getByRole('button')
    const inputName = screen.getByTestId('input-name') as HTMLInputElement
    const inputColor = screen.getByTestId('input-color') as HTMLInputElement

    act(() => {
      fireEvent.change(inputName, { target: { value: 'Test card' }})
      fireEvent.change(inputColor, { target: { value: '#ffffff' }})
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro interno!')).toBeInTheDocument()
    });
  })
})