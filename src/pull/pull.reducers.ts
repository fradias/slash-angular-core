import { PullActions } from './pull.actions';
import { updateAndfilterUniqueItems } from '../shared/helpers';

export interface PullState {
  actions: any[],
  started: boolean,
}

export const initialPullState: PullState = {
  actions: [],
  started: false,
}

export function pull(state = initialPullState, action: PullActions.Actions): PullState {
  switch (action.type) {

    case PullActions.Types.ADD_ACTION:
      return Object.assign({}, state, {
        actions: updateAndfilterUniqueItems(state.actions.concat(action.payload))
      });

    case PullActions.Types.START_POOL:
      return Object.assign({}, state, {
        started: true
      });

    case PullActions.Types.STOP_POOL:
      return Object.assign({}, state, {
        started: false,
        actions: []
      });

    case PullActions.Types.PROCCESS_POOL_FAIL:
    return Object.assign({}, state, {

    });

    case PullActions.Types.RESET_ACTIONS:
      return Object.assign({}, state, {
        actions: [],
        loading: false,
      })

    default:
        return state;
  }
}
