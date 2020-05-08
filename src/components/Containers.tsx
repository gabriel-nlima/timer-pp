import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { mainColors } from '../theme'

// Top-level container
export const MainContainer = styled(SafeAreaView)`
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-color: ${mainColors.darkGrey};
`

type ContainerProps = {
  align?: 'center' | 'stretch' | 'flex-start' | 'flex-end'
  mainContent?: boolean
}
// Container para child components
export const Container = styled.View<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ mainContent }) => (mainContent ? `flex-grow: 1;` : '')}
  width: 100%;
`
interface RowProps {
  justify?: 'flex-start' | 'center' | 'space-between' | 'flex-end'
}
export const Row = styled.View<RowProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ justify }) => justify || 'space-between'};
  align-items: center;
  width: 100%;
`
