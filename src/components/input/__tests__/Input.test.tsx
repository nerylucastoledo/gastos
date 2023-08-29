import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { Input } from '../Input'

describe('Input component', () => {
  test('deveria renderizar com a label, id e name iguais', () => {
    const { getByLabelText, getByRole } = render(<Input label='Name' typeInput='normal' />)

    expect(getByLabelText('Name')).toBeInTheDocument()
    expect(getByRole("textbox")).toHaveAttribute('id', 'name')
    expect(getByRole("textbox")).toHaveAttribute('name', 'name')
  })

  test('deveria renderizar com a classe normal', () => {
    const { getByRole } = render(<Input label='Name' typeInput='normal' />)

    expect(getByRole("textbox")).toHaveClass('normal')
  })

  test('deveria renderizar com a classe border', () => {
    const { getByRole } = render(<Input label='Name' typeInput='border' />)

    expect(getByRole("textbox")).toHaveClass('border')
  })

  test('deveria trocar o valor quando digitado', () => {
    const { getByRole } = render(<Input label='Name' typeInput='normal' />)
    const inputElement = getByRole("textbox") as HTMLInputElement

    expect(inputElement.value).toEqual("")

    fireEvent.change(inputElement, { target: { value: '10' } })

    expect(inputElement.value).toBe('10')
  })
})