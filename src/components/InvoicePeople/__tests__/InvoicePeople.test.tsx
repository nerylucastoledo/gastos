import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { InvoicePeople } from '../InvoicePeople'
import { act } from 'react-dom/test-utils'

const setPeopleSelected = jest.fn()

describe('Invoice item component', () => {
  beforeEach(() => {
    render(
      <InvoicePeople 
        peopleSelected='Eu'
        setPeopleSelected={setPeopleSelected}
        peoples={['Alessa']}
      />
    )
  })

  it('should render 2 peoples', () => {
    const list = screen.getByRole('list').children
    
    expect(screen.getByText('Eu')).toBeInTheDocument()
    expect(screen.getByText('Alessa')).toBeInTheDocument()
    expect(list).toHaveLength(2)
  })

  it('should render 2 items', () => {
    const peopleOne = screen.getByText('Eu')
    expect(peopleOne).toHaveClass('active')
  })

  it('deveria atrocar o nome ativo quando clicado', async () => {
      const peopleTwo = screen.getByText('Alessa')
  
      act(() => {
        fireEvent.click(peopleTwo)
      })
  
      await waitFor(() => {
        expect(setPeopleSelected).toHaveBeenCalled()
      })
    })
})

describe('Invoice item component without data', () => {
  beforeEach(() => {
    render(
      <InvoicePeople 
        peopleSelected='Eu'
        setPeopleSelected={setPeopleSelected}
        peoples={[]}
      />
    )
  })

  it('should render 1 peoples', () => {
    const list = screen.getByRole('list').children
    expect(list).toHaveLength(1)
  })
})