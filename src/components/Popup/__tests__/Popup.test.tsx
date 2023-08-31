
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Popup } from "../Popup"

describe('Popup component', () => {
  it('should show a screen without text if you dont pass the children', () => {
    render(<Popup></Popup>)

    expect(screen.getByTestId('text').innerHTML).toEqual('')
  })

  it('should show a screen with the text "Test" when passing the children', () => {
    render(<Popup>Test</Popup>)

    expect(screen.getByTestId('text').innerHTML).toEqual('Test')
  })

  it('should show a span tag with the text "Test"', () => {
    const { container } = render(<Popup><span>Test</span></Popup>)

    expect(container.querySelector('span')).toBeVisible()
    expect(container.querySelector('span')?.innerHTML).toEqual('Test')
  })
})