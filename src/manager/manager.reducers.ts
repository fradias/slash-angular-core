import { ManagerActions } from './manager.actions';
import { updateAndfilterUniqueItems } from '../shared/helpers';
import { User } from '../user/user.model';

export interface ManagerState {
  activeUser: User,
  premium: boolean,
  plan: string
}

const initialManagerState: ManagerState = {
  activeUser: undefined,
  premium: false,
  plan: ''
}

export function manager(state = initialManagerState, action: ManagerActions.Actions) {
  switch (action.type) {
    case ManagerActions.Types.MANAGER_LOGIN:
      return Object.assign({}, state, {loading: true, error: null});

    case ManagerActions.Types.MANAGER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        activeUser: action.payload,
        premium: action.payload.premium,
        loading: false
      });

    case ManagerActions.Types.MANAGER_LOGIN_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case ManagerActions.Types.MANAGER_LOGOUT:
      return Object.assign({}, state, {
        activeUser: undefined,
        premium: false,
        loading: false
      })

    default:
      return state;
  }
}
