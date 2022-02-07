import styled from 'styled-components'

const Base = styled.div<{
  maxWidth?: string
  margin?: string
  padding?: string
  background?: string
  width?: string
  borderRadius?: string
}>`
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  width: ${({ width }) => (width ? width : 'auto')};
  background: ${({ background }) => (background ? background : 'transparent')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 'auto')};
`

export const Wrapper = styled(Base)`
  padding: ${({ padding }) => (padding ? padding : '1rem')};
`

export const InlineWrapper = styled(Base)<{ alignItems?: string; justifyContent?: string }>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'left')};
`

export const PageWrapper = styled(Base)`
  width: 100%;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '728px')};
`

export const BodyWrapper = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;
  padding-top: 0rem;
  background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#fff')};
`

export const Section = styled.div<{
  paddingTop?: string
  paddingBottom?: string
}>`
  width: 100%;
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '1rem')};
  padding-bottom: ${({ paddingBottom }) => (paddingBottom ? paddingBottom : '1rem')};
`

export const Divider = styled.div<{ size?: string; borderStyle?: string; borderColor?: string; margin?: string }>`
  width: 100%;
  border-bottom: ${({ size }) => (size ? size : '1px')} ${({ borderStyle }) => (borderStyle ? borderStyle : 'solid')}
    ${({ borderColor, theme }) => (borderColor ? borderColor : theme.colors.gray2)};
  margin: ${({ margin }) => (margin ? margin : '0')};
`
