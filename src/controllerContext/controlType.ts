import { States, StateActions } from '../types/state'

export type ControlState = {
  status: States
}

export type ControlActions =
  | { type: StateActions.PAUSE }
  | { type: StateActions.PLAY }
  | { type: StateActions.RESET }
