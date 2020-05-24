import React, { useState, useMemo } from 'react'
import { View } from 'react-native'
import { FAB, Portal, Dialog, Button } from 'react-native-paper'
import { useController } from '../../controllerContext'
import { States } from '../../types/state'
import { FooterRow } from '../../components/Containers'
import { mainColors } from '../../theme'
import { HintText, HighlightText } from '../../components/Texts'
import { useAlertHandler } from '.'
import AlertForm from './AlertForm'

const AlertDialog: React.FC = React.memo(() => {
  const [showDialog, setShowDialog] = useState(false)
  const [{ status }] = useController()
  const { setAlerts, alerts } = useAlertHandler()
  const isStarted = useMemo(() => status === States.STARTED, [status])
  return (
    <FooterRow>
      <View />
      <FAB
        icon="plus"
        accessibilityLabel="Adicionar alerta"
        onPress={() => setShowDialog(true)}
        style={{ width: 55, backgroundColor: mainColors.lightBLue, marginBottom: 15 }}
        disabled={isStarted}
      />
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={{ backgroundColor: mainColors.darkGrey }}
        >
          <Dialog.Title>Adicionar alertas</Dialog.Title>
          <Dialog.Content>
            <HintText>
              Adicione quantos quiser, de acordo com a{' '}
              <HighlightText>ordem em que devem ser executados (de cima para baixo).</HighlightText>
            </HintText>
            <HintText>
              Adicione o intervalo, em <HighlightText>segundos</HighlightText>, e a mensagem do
              alerta.
            </HintText>
            <AlertForm setAlerts={setAlerts} alerts={alerts} isStarted={isStarted} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)} labelStyle={{ fontSize: 18 }}>
              Feito
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </FooterRow>
  )
})
export default AlertDialog
