import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { InvoiceItem } from "../InvoiceItem"
import { mockInvoiceItem, mockInvoiceItemWithoutDataToEu } from "../../../mocks/MockData"

const setModalEdit = jest.fn()
const setModalDelete = jest.fn()
const setActiveTooltip = jest.fn()

describe('Invoice item component', () => {
  beforeEach(() => {
    render(
      <InvoiceItem 
        setActiveTooltip={setActiveTooltip} 
        setModalDelete={setModalDelete} 
        setModalEdit={setModalEdit} 
        activeTooltip={false}
        invoice={mockInvoiceItem}
      />
    )
  })

  it('should render 2 items', () => {
    expect(screen.getByText('Testando')).toBeInTheDocument()
    expect(screen.getByText('Teste 3')).toBeInTheDocument()
  })

  it('should render the edit and delete buttons for each item', () => {
    expect(screen.getByTestId('icon-edit-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-edit-2')).toBeInTheDocument()
    expect(screen.getByTestId('icon-delete-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-delete-2')).toBeInTheDocument()
    expect(screen.getByTestId('icon-tooltip-1')).toBeInTheDocument()
  })

  it('should open edit modal when clicking edit anyone', async () => {
    const itemEditOne = screen.getByTestId('icon-edit-1')

    act(() => {
      fireEvent.click(itemEditOne)
    })

    await waitFor(() => {
      expect(setModalEdit).toHaveBeenCalled()
    })
  })

  it('should open the delete modal when clicking delete anyone', async () => {
    const itemDeleteOne = screen.getByTestId('icon-delete-1')
    
    act(() => {
      fireEvent.click(itemDeleteOne)
    })

    await waitFor(() => {
      expect(setModalDelete).toHaveBeenCalled()
    })
  })
})

describe('Invoice item component without data to Eu', () => {
  beforeEach(() => {
    render(
      <InvoiceItem 
        setActiveTooltip={setActiveTooltip} 
        setModalDelete={setModalDelete} 
        setModalEdit={setModalEdit} 
        activeTooltip={false}
        invoice={mockInvoiceItemWithoutDataToEu}
      />
    )
  })

  it('should render the edit and delete buttons for each item', () => {
    expect(screen.getByTestId('not-found').innerHTML.includes('Nenhum gasto')).toBeTruthy()
  })

})