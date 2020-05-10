import { DefaultTheme, Theme, DarkTheme } from 'react-native-paper'

export const mainColors = {
  darkGrey: '#363636',
  lightGrey: '#9C9C9C',
  white: '#FFFFFF',
  lightBLue: '#4169E1',
  darkSlateBlue: '#483D8B',
  black: '#000000',
}

export const fontSizes = {
  smallText: '14px',
  text: '16px',
  subtitles: '18px',
  titles: '20px',
  timer: '56px',
  listItem: '28px',
  mainTitle: '24px',
}

export const mainTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: mainColors.lightBLue,
    background: mainColors.darkGrey,
    text: mainColors.white,
    onBackground: mainColors.darkGrey,
  },
}
