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

/**
 * ### Estrutura e componentes
 * ControlerContext:
 * Um React Context com reducer para manipular os estados do timer (Playing, paused, reset (zerado), e stoped)
 * No top-level do app para q todos os componentes saibam o estado da aplicação
 *
 * Controlers:
 * Componente com 3 botões (Play/Pause, zerar e Volta), mantem a lógica para startar o timer e afins
 * recebe callbacks que são chamadas antes do dispatch de play ou pause, por exemplo
 * Ao dar play/start o callback onPlay é chamado e depois inicia uma contagem de 3 segundos,
 * para depois start o timer. Isso foi implementado pois no caso do modo Timer e Contador regressivo,
 * é necessário converter o input do usuário para segundos e salvar no state, o que pode demorar, fazer isso e logo em seguida
 * chamar o dispatch(play) causa um pequeno delay para iniciar o timer. Com a contagem de 3 segundos, é
 * suficiente para que o state seja salvo e esteja pronto para iniciar imediatamente.
 *
 * Cron:
 * Cronometro básico, sem user input, apenas o useInterval e componente Controler
 *
 * TimerForm:
 * Formulário para o usuário escolher o tempo do timer ou contador regressivo, converte hh:mm:ss para segundos
 * e passa para o state do componente acima via prop setTime, tem uma flag isReverse para determinar se
 * é Timer (temporizador progressivo) ou Countdown (contagem regressiva). Passa um callback onPlay para o
 * componente controller
 *
 * Timer e Countdown:
 * Componentes para modos timer e contagem regressiva, com user input
 *
 * AlertContext
 * Context para definir alertas e tempo para mostrar cada um.
 * Tem um useInterval e fica sincronizado com o ControlerContext e o Timer, para trocar de alerta
 * junto com o tempo do timer.
 */
