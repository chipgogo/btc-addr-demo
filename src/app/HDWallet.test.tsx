import { render, screen } from '@testing-library/react'
import HDWallet from './HDWallet'
import Theme from 'theme'

test('HDWallet renders and title is visible', () => {
  render(
    <Theme>
      <HDWallet />
    </Theme>
  )
  const linkElement = screen.getByText(/Bitcoin HD Wallet/i)
  expect(linkElement).toBeInTheDocument()
})
