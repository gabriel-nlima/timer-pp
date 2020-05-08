import styled from 'styled-components/native'
import { mainColors, fontSizes } from '../theme'

export const TimerText = styled.Text`
  font-size: ${fontSizes.timer};
  color: ${mainColors.white};
`
export const LoopText = styled.Text`
  font-size: ${fontSizes.listItem};
  color: ${mainColors.white};
`

export const MainTitle = styled.Text`
  font-size: ${fontSizes.mainTitle};
  color: ${mainColors.lightGrey};
  text-align: center;
`
export const CurrentAlert = styled.Text`
  font-size: ${fontSizes.listItem};
  color: ${mainColors.white};
  text-align: center;
`
