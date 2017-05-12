import { ManagerActions } from './manager.actions';
import { updateAndfilterUniqueItems } from '../shared/helpers';
import { User } from '../user/user.model';

export interface ManagerState {
  activeUser: User,
  premium: boolean,
  plan: string,
  token: string,
  slashTokens: any[]
}

const initialManagerState: ManagerState = {
  activeUser: undefined,
  premium: false,
  plan: '',
  token: '',
  slashTokens: []
}

export function manager(state = initialManagerState, action: ManagerActions.Actions) {
  switch (action.type) {
    case ManagerActions.Types.MANAGER_LOGIN:
      return Object.assign({}, state, {loading: true, error: null});

    case ManagerActions.Types.MANAGER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        activeUser: action.payload.user,
        premium: action.payload.user.premium,
        token: action.payload.token,
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
        loading: false,
        token: ''
      });

    case ManagerActions.Types.ADD_SLASH_TOKEN:
      return Object.assign({}, state, {
        slashTokens: state.slashTokens.concat(action.payload)
      });

    default:
      return state;
  }
}
