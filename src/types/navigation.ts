export enum TimerModes {
  CRON = 'CRON',
  TIMER = 'TIMER',
  COUNTDOWN = 'COUNTDOWN',
}
export type TimerProps = {
  mode: TimerModes
}
export type DrawerScreens = {
  Cron: TimerProps
  Timer: TimerProps
  Countdown: TimerProps
  Alerts: undefined
}
