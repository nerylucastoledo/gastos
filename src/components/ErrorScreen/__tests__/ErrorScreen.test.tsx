import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { ErrorScreen } from "../ErrorScreen"

describe('ErrorScreen component', () => {
  it('should show the error message', () => {
    render(<ErrorScreen />)

    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByText('Infelizmente ocorreu um erro e não conseguimos buscar seus dados!')).toBeVisible()
    expect(screen.getByText('Tente novamente mais tarde')).toBeVisible()
  })
})