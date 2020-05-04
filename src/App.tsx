import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ControllerProvider } from './controllerContext'
import Timer from './main/Timer/Timer'
import { mainTheme } from './theme'
import { TimerModes } from './types/navigation'
import Cron from './main/Timer/Cron'
import Countdown from './main/Timer/Countdown'

const Drawer = createDrawerNavigator()

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ControllerProvider>
        <PaperProvider theme={mainTheme}>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Cron">
              <Drawer.Screen
                name="Cron"
                component={Cron}
                initialParams={{ mode: TimerModes.CRON }}
              />
              <Drawer.Screen
                name="Timer"
                component={Timer}
                initialParams={{ mode: TimerModes.TIMER }}
              />
              <Drawer.Screen
                name="Countdown"
                component={Countdown}
                initialParams={{ mode: TimerModes.COUNTDOWN }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ControllerProvider>
    </SafeAreaProvider>
  )
}

export default App
