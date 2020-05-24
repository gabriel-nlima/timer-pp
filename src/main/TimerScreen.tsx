import React, { useState } from 'react'
import { View } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { ScreenProps } from '../types/navigation'
import { ControllerProvider } from '../controllerContext'
import { CurrentAlert, Subtitle } from '../components/Texts'
import { Container, ListsRow, SmallList } from '../components/Containers'
import { DisplayLoop } from '../components/DisplayTime'
import Timer from './Timer/Timer'
import AlertProvider from './Alert'
import AlertHistory from './Alert/AlertHistory'
import AlertDialog from './Alert/AlertDialog'
import { AlertType } from './Alert/types'

const TimerScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
  const [alert, setAlert] = useState<AlertType>()
  const [done, setDone] = useState(false)
  const [loops, setLoops] = useState<number[]>([])
  return (
    <ScreenWrapper title="Timer" navigation={navigation}>
      <ControllerProvider>
        <CurrentAlert>{alert && alert.msg ? alert?.msg : ''}</CurrentAlert>
        <Timer setLoops={setLoops} alert={alert} setDone={setDone} />
        <AlertProvider setAlert={setAlert} done={done} setDone={setDone}>
          <Container>
            <ListsRow>
              <AlertHistory />
              <View>
                {loops.length > 0 && <Subtitle>Voltas</Subtitle>}
                <SmallList>
                  {loops.map((loop, i) => (
                    <DisplayLoop time={loop} key={i} />
                  ))}
                </SmallList>
              </View>
            </ListsRow>
          </Container>
          <AlertDialog />
        </AlertProvider>
      </ControllerProvider>
    </ScreenWrapper>
  )
})

export default TimerScreen
