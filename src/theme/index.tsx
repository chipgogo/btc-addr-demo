import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    primary1: '#FFA521',
    primary2: '#FFB13E',
    primary3: '#FFB74C',
    primary4: '#FFC877',
    primary5: '#D28203',

    secondary1: '#262A41',
    secondary2: '#313754',
    secondary3: '#393f61',
    secondary4: '#424971',
    secondary5: '#5A618B',

    text1: '#262A41',
    text2: '#2B2F4A',
    text3: '#828a92',
    text4: '#79828b',
    text5: '#9299A0',

    gray1: '#adadaf',
    gray2: '#dfdfe1',
    gray3: '#F8F8FA',
  },
}

export default function Theme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export const FixedGlobalStyle = createGlobalStyle`
  html, input, textarea, button {
    font-family: 'Lato', 'Roboto', sans-serif;
    font-display: fallback;
  }

  @supports (font-variation-settings: normal) {
    html, input, textarea, button {
      font-family: 'Lato', 'Roboto', sans-serif;
    }
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  button {
    user-select: none;
  }

  html {
    font-size: 14px;
    font-variant: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  }
`
