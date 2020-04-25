export type MessageType = {
  step: number
  active: boolean
  msg?: string
}
export interface MessageHistory extends MessageType {
  time: number
}
