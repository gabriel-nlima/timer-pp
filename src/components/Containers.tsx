import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { mainColors } from '../theme'

// Top-level container
export const MainContainer = styled(SafeAreaView)`
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  justify-content: center;
  align-items: stretch;
  background-color: ${mainColors.darkGrey};
`

type ContainerProps = {
  align?: 'center' | 'stretch' | 'flex-start' | 'flex-end'
}
// Container para child components
export const Container = styled.View<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: ${({ align }) => align || 'stretch'};
`
