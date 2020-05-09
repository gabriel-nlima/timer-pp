export type AlertType = {
  [x: string]: string | number | boolean | undefined
  step: number
  active: boolean
  msg?: string
}
