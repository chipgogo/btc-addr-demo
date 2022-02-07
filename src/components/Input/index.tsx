import styled from 'styled-components'
import { Wrapper } from 'components/Wrapper'
import { Text } from 'components/Text'

const InputBase = styled.input<{
  fontSize?: string
  padding?: string
  textAlign?: string
  margin?: string
  width?: string
}>`
  border-radius: none;
  border: none;
  display: block;
  padding: ${({ padding }) => (padding ? padding : '0.5rem')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #575757;
  width: ${({ width }) => (width ? width : 'auto')};
  background-clip: padding-box;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  outline: none;
  -webkit-box-align: stretch;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`

export const BorderedInput = styled(InputBase)`
  border-radius: 8px;
  border: 1px solid #e6ebf2 !important;
`

export const LinedInput = styled(InputBase)`
  border-bottom: 1px solid #9299a0 !important;
  background: #f8f8f8;
  padding: ${({ padding }) => (padding ? padding : '0')};
`
