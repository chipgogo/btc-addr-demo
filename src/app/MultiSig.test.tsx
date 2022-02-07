import { render, screen } from '@testing-library/react'
import MultiSig from './MultiSig'
import Theme from 'theme'

test('MultiSig renders and text is visible', () => {
  render(
    <Theme>
      <MultiSig />
    </Theme>
  )
  const linkElement = screen.getByText(/Get address for an m-of-n bitcoin wallet/i)
  expect(linkElement).toBeInTheDocument()
})
