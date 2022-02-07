import { render, screen } from '@testing-library/react'
import Mnemonic from './Mnemonic'
import Theme from 'theme'

test('Mnemonic renders and text is visible', () => {
  render(
    <Theme>
      <Mnemonic />
    </Theme>
  )
  const linkElement = screen.getByText(/Generate Mnemonic/i)
  expect(linkElement).toBeInTheDocument()
})
