import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Timer from './main/Timer/Timer'
import { ControllerProvider } from './controllerContext'
import AlertProvider from './main/Alert'
import AlertForm from './main/Alert/AlertForm'
import AlertHistory from './main/Alert/AlertHistory'

declare const global: any
const isHermes = () => global.HermesInternal !== undefined

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function App() {
  const [alertMsg, setAlertMsg] = useState<string | undefined>()
  return (
    <View style={styles.container}>
      {isHermes() && <Text>Engine: Hermes</Text>}
      {alertMsg && <Text>{alertMsg}</Text>}
      <ControllerProvider>
        <Timer />
        <AlertProvider setAlertMsg={setAlertMsg}>
          <AlertForm />
          <AlertHistory />
        </AlertProvider>
      </ControllerProvider>
    </View>
  )
}
