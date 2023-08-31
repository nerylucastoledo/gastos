
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Modal } from "../Modal"

describe('Popup component', () => {
  it('should show a screen with the text "Test" when passing the children', () => {
    render(<Modal><p data-testid={'text'}>Test</p></Modal>)
    expect(screen.getByTestId('text').innerHTML).toEqual('Test')
  })

  it('should show a span tag with the text "Test"', () => {
    render(<Modal><input placeholder='Test' id='Test' type='text' name='Test' value='Test'/></Modal>)

    const input = screen.getByRole('textbox') as HTMLInputElement

    expect(input).toBeVisible()
    expect(input.value).toEqual('Test')
  })
})