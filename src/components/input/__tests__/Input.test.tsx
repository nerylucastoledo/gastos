import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { Input } from '../Input'

describe('Input component', () => {
  it('should render with the same label, id and name', () => {
    const { getByLabelText, getByRole } = render(<Input label='Name' typeInput='normal' />)

    expect(getByLabelText('Name')).toBeInTheDocument()
    expect(getByRole("textbox")).toHaveAttribute('id', 'name')
    expect(getByRole("textbox")).toHaveAttribute('name', 'name')
  })

  it('should render button with class "normal"', () => {
    const { getByRole } = render(<Input label='Name' typeInput='normal' />)

    expect(getByRole("textbox")).toHaveClass('normal')
  })

  it('should render button with class "border"', () => {
    const { getByRole } = render(<Input label='Name' typeInput='border' />)

    expect(getByRole("textbox")).toHaveClass('border')
  })

  it('should change the value when typing', () => {
    const { getByRole } = render(<Input label='Name' typeInput='normal' />)
    const inputElement = getByRole("textbox") as HTMLInputElement

    expect(inputElement.value).toEqual("")

    fireEvent.change(inputElement, { target: { value: '10' } })

    expect(inputElement.value).toBe('10')
  })
})