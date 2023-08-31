import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { Select } from "../Select"

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novamebro',
  'Dezembro'
]

describe('Select component', () => {
  beforeEach(() => {
    render(<Select />)
  })

  it('should render with the current month and year', () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = months[new Date().getMonth() + 1]

    expect(screen.getByText(currentYear)).toBeVisible()
    expect(screen.getByText(currentMonth)).toBeVisible()
  })

  it('should have option of 2 years past and 9 years into the future', async () => {
    const currentYear = new Date().getFullYear()

    expect(screen.getByText(currentYear - 2)).toBeVisible()
    expect(screen.getByText(currentYear + 9)).toBeVisible()
    expect(() => screen.getByText(currentYear - 3)).toThrow('Unable to find an element');
    expect(() => screen.getByText(currentYear + 10)).toThrow('Unable to find an element');
  })
})