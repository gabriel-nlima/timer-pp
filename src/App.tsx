import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { mainTheme, mainColors } from './theme'
import CronScreen from './main/CronScreen'
import TimerScreen from './main/TimerScreen'
import CountdownScreen from './main/CountdownScreen'

const Drawer = createDrawerNavigator()

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={mainTheme}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Timer"
            drawerStyle={{ backgroundColor: mainColors.darkGrey }}
            drawerContentOptions={{
              activeBackgroundColor: mainColors.lightBLue,
              labelStyle: { color: mainColors.white, fontSize: 24 },
            }}
          >
            <Drawer.Screen
              name="Cron"
              component={CronScreen}
              options={{ drawerLabel: 'Cronômetro' }}
            />
            <Drawer.Screen
              name="Timer"
              component={TimerScreen}
              options={{ drawerLabel: 'Timer' }}
            />
            <Drawer.Screen
              name="Countdown"
              component={CountdownScreen}
              options={{ drawerLabel: 'Contagem Regressiva' }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

export default App

/**
 * ### Estrutura e componentes
 * ControlerContext:
 * Um React Context com reducer para manipular os estados do timer (Playing, paused, reset (zerado), e STOPPED)
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
