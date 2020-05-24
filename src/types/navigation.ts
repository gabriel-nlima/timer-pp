import { ReactNode } from 'react'
import { DrawerNavigationProp } from '@react-navigation/drawer'

export type ScreenProps = {
  navigation: DrawerNavigationProp<{}>
}
export interface ScreenWrapperProps extends ScreenProps {
  bottomContent?: ReactNode
  title: string
}
