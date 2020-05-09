import styled from 'styled-components/native'
import { mainColors } from '../theme'

// Top-level container
export const MainContainer = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  background-color: ${mainColors.darkGrey};
  width: 100%;
  height: 100%;
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
  ${({ mainContent }) => (mainContent ? `align-self: center; margin-top: auto;` : '')}
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
export const ListsRow = styled.View<RowProps>`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
export const SmallList = styled.ScrollView`
  text-align: center;
  height: 120px;
  min-width: 130px;
`
export const HeaderRow = styled.View`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  margin-top: 0;
  position: absolute;
`
export const FooterRow = styled.View`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  position: absolute;
  bottom: 15px;
  right: 15px;
`
