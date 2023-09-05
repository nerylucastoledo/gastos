import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { NewCard } from "../NewCard"

const setIsModalOpen = jest.fn()
jest.mock("../../../utils/SendDataApi", () => ({
  sendData: jest.fn(() => Promise.resolve({ ok: false }))
}))

describe('New card component', () => {
  beforeEach(() => {
    render(<NewCard setIsModalOpen={setIsModalOpen}/>)
  })

  it('deveria renderizar com 2 inputs na tela', () => {
    expect(screen.getByTestId('input-name')).toBeInTheDocument()
    expect(screen.getByTestId('input-color')).toBeInTheDocument()
  })

  it('deveria renderizar com 1 botão na tela', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button').innerHTML).toEqual('Inserir')
  })

  it('deveria atualizar o valor quando digitado', () => {
    const inputName = screen.getByTestId('input-name') as HTMLInputElement
    const inputColor = screen.getByTestId('input-color') as HTMLInputElement

    expect(inputName.value).toEqual('')
    expect(inputColor.value).toEqual('#000000')

    fireEvent.change(inputName, { target: { value: 'Test card' }})
    fireEvent.change(inputColor, { target: { value: '#ffffff' }})

    expect(inputName.value).toEqual('Test card')
    expect(inputColor.value).toEqual('#ffffff')
  })

  it('deveria aparecer um erro no input ao clicar em enviar sem preencher o nome', () => {
    const button = screen.getByRole('button')

    expect(() => screen.getByText('Nome não pode ser vazio')).toThrow('Unable to find an element')

    fireEvent.click(button)

    expect(screen.getByText('Nome não pode ser vazio')).toBeInTheDocument()
  })
  
  it('deveria aparecer o popup com a mensagem de "Ocorreu um erro interno!" quando a api der erro', async () => {
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