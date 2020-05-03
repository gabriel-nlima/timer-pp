import { DefaultTheme, Theme } from 'react-native-paper'

export const mainColors = {
  darkGrey: '#363636',
  lightGrey: '#9C9C9C',
  white: '#FFFFFF',
  lightBLue: '#4169E1',
  darkSlateBlue: '#483D8B',
  black: '#000000',
}

export const fontSizes = {
  text: '12px',
  subtitles: '14px',
  titles: '16px',
  timer: '28px',
}

export const mainTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: mainColors.lightBLue,
    background: mainColors.darkGrey,
    text: mainColors.white,
    onBackground: mainColors.darkGrey,
  },
}
