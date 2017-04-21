import { User } from './user.model';
import { UserActions } from './user.actions';
import { updateAndfilterUniqueItems } from '../shared/helpers';

export interface UserState {
  userList: User[],
  loading: boolean
}

const initialUserState: UserState = {
  userList: [],
  loading: false
}

export function users(state = initialUserState, action: UserActions.Actions) {
  switch (action.type) {
    case UserActions.Types.GET_USERS_BY_ID:
      return Object.assign({}, state, {loading: true, error: null});

    case UserActions.Types.GET_USERS_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        userList: updateAndfilterUniqueItems(state.userList.concat(action.payload)),
        loading: false
      });

    case UserActions.Types.GET_USERS_BY_ID_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case UserActions.Types.CREATE_USER:
      return Object.assign({}, state, {loading: true, error: null});

    case UserActions.Types.CREATE_USER_SUCCESS:
      console.log('User Created Correctly');
      console.log(action.payload);
      return Object.assign({}, state, {
        loading: false
      });

    case UserActions.Types.CREATE_USER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });



    default:
      return state;
  }
}
