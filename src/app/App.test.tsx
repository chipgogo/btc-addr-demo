import { render, screen } from '@testing-library/react'
import App from './App'
import Theme from 'theme'

test('App renders and title is visible', () => {
  render(
    <Theme>
      <App />
    </Theme>
  )
  const linkElement = screen.getByText(/Bitcoin Address Demo/i)
  expect(linkElement).toBeInTheDocument()
})
