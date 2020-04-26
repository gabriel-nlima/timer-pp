import { ControlState, ControlActions } from './controlType'
import { StateActions, States } from '../types/state'

export const controlReducer = (state: ControlState, action: ControlActions) => {
  switch (action.type) {
    case StateActions.PAUSE:
      return { ...state, status: States.PAUSED }
    case StateActions.PLAY:
      return { ...state, status: States.PLAYING }
    case StateActions.RESET:
      return { ...state, status: States.RESETED }
    default:
      return state
  }
}
