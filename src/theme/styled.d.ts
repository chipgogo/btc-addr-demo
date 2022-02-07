import 'styled-components'

export type Color = string
export interface Colors {
  primary1: Color
  primary2: Color
  primary3: Color
  primary4: Color
  primary5: Color

  secondary1: Color
  secondary2: Color
  secondary3: Color
  secondary4: Color
  secondary5: Color

  text1: Color
  text2: Color
  text3: Color
  text4: Color
  text5: Color

  gray1: Color
  gray2: Color
  gray3: Color
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
  }
}
