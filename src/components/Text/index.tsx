import styled from 'styled-components'

const Base = styled.p<{
  fontSize?: string
  color?: string
  width?: string
  padding?: string
  textAlign?: string
  lineHeight?: string
  colorIsPrimary?: boolean
}>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  color: ${({ color, colorIsPrimary, theme }) =>
    color ? color : colorIsPrimary ? theme.colors.primary1 : theme.colors.text1};
  width: ${({ width }) => (width ? width : 'auto')};
  margin: 0;
  padding: ${({ padding }) => (padding ? padding : '0.1rem 0')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '1.5')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`

export const Text = styled(Base)<{ fontWeight?: string }>`
  width: ${({ width }) => (width ? width : 'fit-content')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '400')};
  padding: ${({ padding }) => (padding ? padding : '0')};
`

export const Header1 = styled.h1<{
  fontSize?: string
  mobileFontSize?: string
  color?: string
  width?: string
  padding?: string
  margin?: string
  colorIsPrimary?: boolean
}>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '36px')};
  font-weight: 900;
  width: ${({ width }) => (width ? width : 'auto')};
  color: ${({ color, colorIsPrimary, theme }) =>
    color ? color : colorIsPrimary ? theme.colors.primary1 : theme.colors.text1};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  line-height: 1.5;
`

export const Header2 = styled.h2<{
  fontSize?: string
  color?: string
  width?: string
  padding?: string
  mobileFontSize?: string
  margin?: string
  colorIsPrimary?: boolean
}>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '27px')};
  font-weight: 900;
  width: ${({ width }) => (width ? width : 'auto')};
  color: ${({ color, colorIsPrimary, theme }) =>
    color ? color : colorIsPrimary ? theme.colors.primary1 : theme.colors.text1};
  padding: ${({ padding }) => (padding ? padding : '0')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  line-height: 1.5;
`

export const Header3 = styled.h3<{
  fontSize?: string
  mobileFontSize?: string
  color?: string
  width?: string
  padding?: string
  margin?: string
  colorIsPrimary?: boolean
}>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '24px')};
  font-weight: 700;
  width: ${({ width }) => (width ? width : 'auto')};
  color: ${({ color, colorIsPrimary, theme }) =>
    color ? color : colorIsPrimary ? theme.colors.primary1 : theme.colors.text1};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  line-height: 1.5;
`

export const Header4 = styled.h4<{
  fontSize?: string
  mobileFontSize?: string
  color?: string
  width?: string
  padding?: string
  margin?: string
  colorIsPrimary?: boolean
}>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '20px')};
  font-weight: 700;
  width: ${({ width }) => (width ? width : 'auto')};
  margin: 1rem 0;
  color: ${({ color, colorIsPrimary, theme }) =>
    color ? color : colorIsPrimary ? theme.colors.primary1 : theme.colors.text1};
  margin: ${({ margin }) => (margin ? margin : '0')};
  padding: ${({ padding }) => (padding ? padding : '0')};
  line-height: 1.5;
`

export const TextArea = styled.textarea<{
  padding?: string
  width?: string
  margin?: string
}>`
  width: ${({ width }) => (width ? width : '100%')};
  padding: ${({ padding }) => (padding ? padding : '12px 20px')};
  margin: ${({ margin }) => (margin ? margin : '0')};
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray3};
  resize: none;
`
