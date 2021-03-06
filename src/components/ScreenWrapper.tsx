import React from 'react'
import { IconButton } from 'react-native-paper'
import { View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { ScreenWrapperProps } from '../types/navigation'
import { MainContainer, HeaderRow } from './Containers'
import { MainTitle } from './Texts'
import { mainColors } from '../theme'

const ScreenWrapper: React.FC<ScreenWrapperProps> = React.memo(
  ({ navigation, title, children }) => {
    const { bottom, top } = useSafeArea()
    return (
      <MainContainer style={{ paddingTop: top, paddingBottom: bottom }}>
        <HeaderRow style={{ top }}>
          <IconButton
            icon="menu"
            color={mainColors.lightBLue}
            size={28}
            onPress={() => navigation.toggleDrawer()}
          />
          <MainTitle>{title}</MainTitle>
          <View style={{ width: 62 }} />
        </HeaderRow>
        {children}
      </MainContainer>
    )
  },
)
export default ScreenWrapper

// const Alerts: React.FC = React.memo(() => {
//   const [showDialog, setShowDialog] = useState(false)
//   const [{ status }] = useController()
//   const { setAlerts, alerts } = useAlertHandler()
//   const isStarted = useMemo(() => status === States.STARTED, [status])
//   return (
//     <FooterRow>
//       <View />
//       <FAB
//         icon="plus"
//         accessibilityLabel="Adicionar alerta"
//         onPress={() => setShowDialog(true)}
//         style={{ width: 55, backgroundColor: mainColors.lightBLue, marginBottom: 15 }}
//         disabled={isStarted}
//       />
//       <Portal>
//         <Dialog
//           visible={showDialog}
//           onDismiss={() => setShowDialog(false)}
//           style={{ backgroundColor: mainColors.darkGrey }}
//         >
//           <Dialog.Title>Adicionar alertas</Dialog.Title>
//           <Dialog.Content>
//             <HintText>
//               Adicione quantos quiser, de acordo com a{' '}
//               <HighlightText>ordem em que devem ser executados (de cima para baixo).</HighlightText>
//             </HintText>
//             <HintText>
//               Adicione o intervalo, em <HighlightText>segundos</HighlightText>, e a mensagem do
//               alerta.
//             </HintText>
//             <AlertForm setAlerts={setAlerts} alerts={alerts} isStarted={isStarted} />
//           </Dialog.Content>
//           <Dialog.Actions>
//             <Button onPress={() => setShowDialog(false)} labelStyle={{ fontSize: 18 }}>
//               Feito
//             </Button>
//           </Dialog.Actions>
//         </Dialog>
//       </Portal>
//     </FooterRow>
//   )
// })

// export const CronScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
//   const [alertMsg, setAlertMsg] = useState<string | undefined>()
//   const [loops, setLoops] = useState<number[]>([])
//   return (
//     <ScreenWrapper title="Cronômetro" navigation={navigation}>
//       <ControllerProvider>
//         <CurrentAlert>{alertMsg}</CurrentAlert>
//         <Cron setLoops={setLoops} />
//         <AlertProvider setAlertMsg={setAlertMsg}>
//           <Container>
//             <ListsRow>
//               <AlertHistory />
//               <View>
//                 {loops.length > 0 && <Subtitle>Voltas</Subtitle>}
//                 <SmallList>
//                   {loops.map((loop, i) => (
//                     <DisplayLoop time={loop} key={i} />
//                   ))}
//                 </SmallList>
//               </View>
//             </ListsRow>
//           </Container>
//           <Alerts />
//         </AlertProvider>
//       </ControllerProvider>
//     </ScreenWrapper>
//   )
// })

// export const TimerScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
//   const [alertMsg, setAlertMsg] = useState<string | undefined>()
//   const [loops, setLoops] = useState<number[]>([])
//   return (
//     <ScreenWrapper title="Timer" navigation={navigation}>
//       <ControllerProvider>
//         <CurrentAlert>{alertMsg}</CurrentAlert>
//         <Timer setLoops={setLoops} />
//         <AlertProvider setAlertMsg={setAlertMsg}>
//           <Container>
//             <ListsRow>
//               <AlertHistory />
//               <View>
//                 {loops.length > 0 && <Subtitle>Voltas</Subtitle>}
//                 <SmallList>
//                   {loops.map((loop, i) => (
//                     <DisplayLoop time={loop} key={i} />
//                   ))}
//                 </SmallList>
//               </View>
//             </ListsRow>
//           </Container>
//           <Alerts />
//         </AlertProvider>
//       </ControllerProvider>
//     </ScreenWrapper>
//   )
// })

// export const CountdownScreen: React.FC<ScreenProps> = React.memo(({ navigation }) => {
//   const [alertMsg, setAlertMsg] = useState<string | undefined>()
//   const [loops, setLoops] = useState<number[]>([])
//   return (
//     <ScreenWrapper title="Contagem Regressiva" navigation={navigation}>
//       <ControllerProvider>
//         <CurrentAlert>{alertMsg}</CurrentAlert>
//         <Countdown setLoops={setLoops} />
//         <AlertProvider setAlertMsg={setAlertMsg}>
//           <Container>
//             <ListsRow>
//               <AlertHistory />
//               <View>
//                 {loops.length > 0 && <Subtitle>Voltas</Subtitle>}
//                 <SmallList>
//                   {loops.map((loop, i) => (
//                     <DisplayLoop time={loop} key={i} />
//                   ))}
//                 </SmallList>
//               </View>
//             </ListsRow>
//           </Container>
//           <Alerts />
//         </AlertProvider>
//       </ControllerProvider>
//     </ScreenWrapper>
//   )
// })
