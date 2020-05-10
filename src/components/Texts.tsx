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
  font-weight: bold;
  min-width: 115px;
`
export const CurrentAlert = styled.Text`
  font-size: ${fontSizes.listItem};
  font-weight: 700;
  color: ${mainColors.white};
  text-align: center;
  margin-bottom: 10px;
`
interface HistoryProps {
  color?: string
}
export const AlertHistoryItem = styled.Text<HistoryProps>`
  color: ${({ color }) => color || mainColors.lightGrey};
  text-align: center;
  font-size: ${fontSizes.text};
`
export const Subtitle = styled.Text`
  color: ${mainColors.lightGrey};
  text-align: center;
  font-size: ${fontSizes.subtitles};
`
export const HintText = styled.Text`
  color: ${mainColors.lightGrey};
  font-size: ${fontSizes.smallText};
  text-align: justify;
  margin-bottom: 5px;
`
export const HighlightText = styled.Text`
  color: ${mainColors.lightBLue};
  font-size: ${fontSizes.smallText};
  font-weight: 700;
`
