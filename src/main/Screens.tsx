import React, { useState, useMemo } from 'react'
import { IconButton, FAB, Portal, Dialog, Button } from 'react-native-paper'
import { View } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ScrollView } from 'react-native-gesture-handler'
import { MainContainer, Row, Container } from '../components/Containers'
import Cron from './Timer/Cron'
import Timer from './Timer/Timer'
import Countdown from './Timer/Countdown'
import { ControllerProvider, useController } from '../controllerContext'
import { MainTitle, CurrentAlert } from '../components/Texts'
import { mainColors } from '../theme'
import AlertProvider, { useAlertHandler } from './Alert'
import AlertForm from './Alert/AlertForm'
import { States } from '../types/state'
import AlertHistory from './Alert/AlertHistory'

type ScreenProps = {
  navigation: DrawerNavigationProp<{}>
}
interface ScreenWrapperProps extends ScreenProps {
  bottomContent?: React.ReactNode
  title: string
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = React.memo(
  ({ navigation, title, children }) => {
    return (
      <MainContainer>
        <Row>
          <IconButton
            icon="menu"
            color={mainColors.lightBLue}
            size={28}
            onPress={() => navigation.toggleDrawer()}
          />
          <MainTitle>{title}</MainTitle>
          <View style={{ width: 62 }} />
        </Row>
        <Container align="center" mainContent>
          {children}
        </Container>
      </MainContainer>
    )
  },
)

const Alerts: React.FC = React.memo(() => {
  const [showDialog, setShowDialog] = useState(false)
  const [{ status }] = useController()
  const { setAlerts } = useAlertHandler()
  const isPlaying = useMemo(() => status === States.PLAYING, [status])
  return (
    <Row>
      <View style={{ width: 55 }} />
      <ScrollView style={{ width: 150 }}>
        <AlertHistory />
      </ScrollView>
      <FAB
        icon="plus"
        accessibilityLabel="Adicionar alerta"
        onPress={() => setShowDialog(true)}
        style={{ width: 55, backgroundColor: mainColors.lightBLue, marginBottom: 40 }}
        disabled={isPlaying}
      />
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={{ backgroundColor: mainColors.darkGrey }}
        >
          <Dialog.Title>Adicionar alertas</Dialog.Title>
          <Dialog.Content>
            <AlertForm setAlerts={setAlerts} isPlaying={isPlaying} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)} labelStyle={{ fontSize: 18 }}>
              Feito
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Row>
  )
})

export const CronScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
  return (
    <ScreenWrapper title="Cronômetro" navigation={navigation}>
      <ControllerProvider>
        <Cron />
        <AlertProvider>
          <Alerts />
        </AlertProvider>
      </ControllerProvider>
    </ScreenWrapper>
  )
})

export const TimerScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
  const [alertMsg, setAlertMsg] = useState<string | undefined>()
  return (
    <ScreenWrapper title="Timer" navigation={navigation}>
      <ControllerProvider>
        <CurrentAlert>{alertMsg}</CurrentAlert>
        <Timer />
        <AlertProvider setAlertMsg={setAlertMsg}>
          <Alerts />
        </AlertProvider>
      </ControllerProvider>
    </ScreenWrapper>
  )
})

export const CountdownScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
  return (
    <ScreenWrapper title="Contagem Regressiva" navigation={navigation}>
      <ControllerProvider>
        <Countdown />
        <AlertProvider>
          <Alerts />
        </AlertProvider>
      </ControllerProvider>
    </ScreenWrapper>
  )
})
