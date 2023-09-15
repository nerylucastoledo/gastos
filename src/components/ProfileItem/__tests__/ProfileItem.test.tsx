import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ProfileItem } from '../ProfileItem'
import { mockProfileItemCardList, mockProfileItemCategoryList, mockProfileItemPeopleList } from '../../../mocks/MockData'

const setUpdate = jest.fn()
jest.mock("../../../utils/SendDataApi", () => ({
  sendData: jest.fn(() => Promise.resolve({ ok: true }))
}))

describe('Profile item component with data', () => {
  describe('Render card items', () => {
    beforeEach(() => {
      render(<ProfileItem nameItem='card' setUpdate={setUpdate} title='Cartões cadastradado' data={mockProfileItemCardList}/>)
    })

    it('should show title "Cartões cadastradado"', () => {
      expect(screen.getByText('Cartões cadastradado')).toBeInTheDocument()
    })

    it('should show 3 cards on the screen', () => {
      expect(screen.getByTestId('profile').children).toHaveLength(3)
      expect(screen.getByText('Cartao 1')).toBeInTheDocument()
      expect(screen.getByText('Cartao 2')).toBeInTheDocument()
      expect(screen.getByText('Cartao 3')).toBeInTheDocument()
    })

    it('should show edit and delete button for each item', () => {
      expect(screen.getAllByAltText('Icon editar')).toHaveLength(3)
      expect(screen.getAllByAltText('Icon deletar')).toHaveLength(3)
    })

    it('should open edit modal when clicking edit any card', async () => {
      const itemEditOne = screen.getAllByAltText('Icon editar')[0]
      
      act(() => {
        fireEvent.click(itemEditOne)
      })
  
      await waitFor(() => {
        const inputEdit = screen.getByTestId('input-name') as HTMLInputElement

        expect(screen.getByTestId('form-card')).toBeInTheDocument()
        expect(inputEdit).toBeInTheDocument()
        expect(inputEdit.value).toEqual('Cartao 1')
      })
    })

    it('should open the delete modal when clicking on edit any card', async () => {
      const itemDeleteOne = screen.getAllByAltText('Icon deletar')[0]
      
      act(() => {
        fireEvent.click(itemDeleteOne)
      })
  
      await waitFor(() => {
        expect(screen.getByTestId('information-message')).toBeInTheDocument()
        expect(screen.getByTestId('information-message').innerHTML)
        .toEqual('Dados com esse nome serão deletados. <br> Tem certeza que quer deletar o(a) <b>Cartao 1</b>?')
      })
    })
  })

  describe('Render category items', () => {
    beforeEach(() => {
      render(<ProfileItem nameItem='category' setUpdate={setUpdate} title='Suas categorias' data={mockProfileItemCategoryList}/>)
    })

    it('should show title "Suas categorias"', () => {
      expect(screen.getByText('Suas categorias')).toBeInTheDocument()
    })

    it('should show 3 categories on screen', () => {
      expect(screen.getByTestId('profile').children).toHaveLength(3)
      expect(screen.getByText('Category 1')).toBeInTheDocument()
      expect(screen.getByText('Category 2')).toBeInTheDocument()
      expect(screen.getByText('Category 3')).toBeInTheDocument()
    })

    it('should show edit and delete button for each item', () => {
      expect(screen.getAllByAltText('Icon editar')).toHaveLength(3)
      expect(screen.getAllByAltText('Icon deletar')).toHaveLength(3)
    })

    it('should open the edit modal when clicking on edit any category', async () => {
      const itemEditOne = screen.getAllByAltText('Icon editar')[0]
      
      act(() => {
        fireEvent.click(itemEditOne)
      })
  
      await waitFor(() => {
        const inputEdit = screen.getByTestId('input-name') as HTMLInputElement

        expect(screen.getByTestId('form-category')).toBeInTheDocument()
        expect(inputEdit).toBeInTheDocument()
        expect(inputEdit.value).toEqual('Category 1')
      })
    })

    it('should open the delete modal when clicking on edit any category', async () => {
      const itemDeleteOne = screen.getAllByAltText('Icon deletar')[0]
      
      act(() => {
        fireEvent.click(itemDeleteOne)
      })
  
      await waitFor(() => {
        expect(screen.getByTestId('information-message')).toBeInTheDocument()
        expect(screen.getByTestId('information-message').innerHTML)
        .toEqual('Dados com esse nome serão deletados. <br> Tem certeza que quer deletar o(a) <b>Category 1</b>?')
      })
    })
  })

  describe('Render people items', () => {
    beforeEach(() => {
      render(<ProfileItem nameItem='people' setUpdate={setUpdate} title='Pessoas cadastradas' data={mockProfileItemPeopleList}/>)
    })

    it('should show title "Pessoas cadastradas"', () => {
      expect(screen.getByText('Pessoas cadastradas')).toBeInTheDocument()
    })

    it('should show 3 people on screen', () => {
      expect(screen.getByTestId('profile').children).toHaveLength(3)
      expect(screen.getByText('People 1')).toBeInTheDocument()
      expect(screen.getByText('People 2')).toBeInTheDocument()
      expect(screen.getByText('People 3')).toBeInTheDocument()
    })

    it('should show edit and delete button for each item', () => {
      expect(screen.getAllByAltText('Icon editar')).toHaveLength(3)
      expect(screen.getAllByAltText('Icon deletar')).toHaveLength(3)
    })

    it('should open edit modal when clicking edit anyone', async () => {
      const itemEditOne = screen.getAllByAltText('Icon editar')[0]
      
      act(() => {
        fireEvent.click(itemEditOne)
      })
  
      await waitFor(() => {
        const inputEdit = screen.getByTestId('input-name') as HTMLInputElement

        expect(screen.getByTestId('form-people')).toBeInTheDocument()
        expect(inputEdit).toBeInTheDocument()
        expect(inputEdit.value).toEqual('People 1')
      })
    })

    it('should open the delete modal when clicking delete anyone', async () => {
      const itemDeleteOne = screen.getAllByAltText('Icon deletar')[0]
      
      act(() => {
        fireEvent.click(itemDeleteOne)
      })
  
      await waitFor(() => {
        expect(screen.getByTestId('information-message')).toBeInTheDocument()
        expect(screen.getByTestId('information-message').innerHTML)
        .toEqual('Dados com esse nome serão deletados. <br> Tem certeza que quer deletar o(a) <b>People 1</b>?')
      })
    })
  })
})