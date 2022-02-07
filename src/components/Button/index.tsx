import styled from 'styled-components'
import { darken } from 'polished'

import { Button as RebassButton } from 'rebass/styled-components'

const Base = styled(RebassButton)<{
  color?: string
  padding?: string
  margin?: string
  borderColor?: string
  borderRadius?: string
  altDisabledStyle?: boolean
  fontSize?: string
}>`
  padding: ${({ padding }) => (padding ? padding : '1rem')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  font-weight: 700;
  text-align: center;
  outline: none;
  border: 1px solid ${({ borderColor }) => (borderColor ? borderColor : 'transparent')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0')};
  color: ${({ color }) => (color ? color : '#fff')};
  text-decoration: none;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.colors.primary1};
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.colors.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.colors.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary1)};
  }
  &:disabled {
    background-color: #d6d6d6;
    color: #fff;
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonSecondary = styled(ButtonPrimary)`
  background-color: #262a41;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.colors.secondary1)};
    background-color: ${({ theme }) => darken(0.05, theme.colors.secondary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.secondary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.colors.secondary1)};
    background-color: ${({ theme }) => darken(0.05, theme.colors.secondary1)};
  }
  &:disabled {
    background-color: #d6d6d6;
    color: #fff;
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`
