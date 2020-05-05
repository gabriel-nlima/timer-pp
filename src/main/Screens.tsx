import React from 'react'
import { MainContainer } from '../components/Containers'
import Cron from './Timer/Cron'
import Timer from './Timer/Timer'
import Countdown from './Timer/Countdown'
import { ControllerProvider } from '../controllerContext'

export const CronScreen: React.FC = React.memo(() => {
  return (
    <MainContainer>
      <ControllerProvider>
        <Cron />
      </ControllerProvider>
    </MainContainer>
  )
})

export const TimerScreen: React.FC = React.memo(() => {
  return (
    <MainContainer>
      <ControllerProvider>
        <Timer />
      </ControllerProvider>
    </MainContainer>
  )
})

export const CountdownScreen: React.FC = React.memo(() => {
  return (
    <MainContainer>
      <ControllerProvider>
        <Countdown />
      </ControllerProvider>
    </MainContainer>
  )
})
