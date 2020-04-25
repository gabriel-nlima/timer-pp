import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Timer from './Timer'
import useInterval from './hooks/useInterval'
import DisplayTime from './components/DisplayTime'
import MessageForm from './MessageForm'
import { MessageType } from './types'

declare const global: any
const isHermes = () => global.HermesInternal !== undefined
console.log(`Hermes enabled: ${isHermes()}`)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function App() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [currentMessage, setCurrentMessage] = useState<MessageType | undefined>(
    messages.find(m => m.active),
  )

  const [msgsHistory, setMsgsHistory] = useState<MessageType[]>([])

  const [isPlaying, setIsPlaying] = useState(false)
  const [loops, setLoops] = useState<number[]>([])

  // Ativa a mensagem com menor tempo ao iniciar/se n houver mensagem ativa
  // TODO não deixar ter mais de uma mensagem ativa
  useEffect(() => {
    const msgs = Array.from(messages)
    if (!msgs.find(m => m.active) && msgs.length > 0) {
      msgs[0].active = true
      setMessages(msgs)
    }
  }, [messages])

  useEffect(() => {
    !currentMessage && setCurrentMessage(messages.find(m => m.active))
  }, [messages, currentMessage])

  const setNextActiveMsg = useCallback(
    (msg: MessageType) => {
      if (msg.active) {
        const msgs = Array.from(messages)
        const msgIndex = msgs.findIndex(m => m.active)
        if (msgIndex > -1) {
          // Desativa a mensagem atual e ativa a próxima
          msgs[msgIndex].active = false

          setMsgsHistory(prev => [
            {
              ...msgs[msgIndex],
              msg: `${msgs[msgIndex].msg} (${prev.length + 1})`,
            },
            ...prev,
          ])

          if (msgIndex + 1 <= messages.length - 1) {
            msgs[msgIndex + 1].active = true
            setCurrentMessage(msgs[msgIndex + 1])
          } else {
            // Chegou no final do array, ativa a primeira mensagem (com menor tempo)
            msgs[0].active = true
            setCurrentMessage(msgs[0])
          }
        }
        setMessages(msgs)
      }
    },
    [messages],
  )

  const addMessage = useCallback((msg: MessageType) => {
    setMessages(prev => [...prev, msg])
  }, [])
  useInterval(
    () => {
      currentMessage && setNextActiveMsg(currentMessage)
    },
    isPlaying && currentMessage && currentMessage.active ? currentMessage.step * 1000 : undefined,
  )

  return (
    <View style={styles.container}>
      {isHermes() && <Text>Engine: Hermes</Text>}
      <MessageForm setMessage={addMessage} playing={isPlaying} />
      <Text>{currentMessage?.msg}</Text>
      <Timer setIsPlaying={setIsPlaying} setLoops={setLoops} playing={isPlaying} />
      {msgsHistory.map((message, idx) => (
        <Text key={idx}>{message.msg}</Text>
      ))}
      {loops.map((loop, idx) => (
        <DisplayTime key={idx} time={loop} />
      ))}
    </View>
  )
}
