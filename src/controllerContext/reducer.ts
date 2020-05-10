import { ControlState, ControlActions } from './controlType'
import { StateActions, States } from '../types/state'

export const controlReducer = (state: ControlState, action: ControlActions) => {
  switch (action.type) {
    case StateActions.PAUSE:
      return { ...state, status: States.PAUSED }
    case StateActions.START:
      return { ...state, status: States.STARTED }
    case StateActions.RESET:
      return { ...state, status: States.RESETED }
    case StateActions.STOP:
      return { ...state, status: States.STOPPED }
    default:
      return state
  }
}
