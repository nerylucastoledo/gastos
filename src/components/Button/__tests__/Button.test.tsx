import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button component', () => {
  it('should render button with class "principal"', () => {
    render(<Button typeBtn="principal">Test Button</Button>)
    const buttonElement = screen.getByText('Test Button')
    
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('principal')
  })

  it('should render button with class "accepted"', () => {
    render(<Button typeBtn="accepted">Test Button</Button>)
    const buttonElement = screen.getByText('Test Button')
    
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('accepted')
  })

  it('should render button with class "refused"', () => {
    render(<Button typeBtn="refused">Test Button</Button>)
    const buttonElement = screen.getByText('Test Button')
    
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass('refused')
  })

  it('should pass extra props to button element', () => {
    render(<Button typeBtn="principal" id="my-button">Test Button</Button>)
    const buttonElement = screen.getByText('Test Button')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveAttribute('id', 'my-button')
  })
})