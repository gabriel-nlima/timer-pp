import styled from 'styled-components/native'
import { mainColors, fontSizes } from '../theme'

export const TimerText = styled.Text`
  font-size: ${fontSizes.timer};
  color: ${mainColors.white};
`
export const LoopText = styled.Text`
  font-size: ${fontSizes.text};
  color: ${mainColors.lightGrey};
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
  margin-bottom: 10px;
`

export const AlertHistoryItem = styled.Text`
  color: ${mainColors.lightGrey};
  text-align: center;
  font-size: ${fontSizes.text};
`
export const Subtitle = styled.Text`
  color: ${mainColors.lightGrey};
  text-align: center;
  font-size: ${fontSizes.subtitles};
`
