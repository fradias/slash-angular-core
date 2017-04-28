import { SlashActions } from './slash.actions';
import { Slash } from './slash.model';
import { updateAndfilterUniqueItems } from '../shared/helpers';


export interface SlashState {
  currentSlashesId: string[],
  slashList: Slash[],
  loading: boolean
}

const initialSlashState: SlashState = {
  currentSlashesId: undefined,
  slashList: [],
  loading: false
}

export function slashes(state = initialSlashState, action: SlashActions.Actions) {
  switch (action.type) {

    case SlashActions.Types.GET_SLASHES:
      return Object.assign({}, state, {loading: true, error: null});

    case SlashActions.Types.GET_SLASHES_SUCCESS:
      return Object.assign({}, state, {
        slashList: updateAndfilterUniqueItems(state.slashList.concat(action.payload)),
        loading: false
      });

    case SlashActions.Types.GET_SLASHES_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case SlashActions.Types.GET_SLASHES_BY_NAME:
      return Object.assign({}, state, {loading: true, error: null});

    case SlashActions.Types.GET_SLASHES_BY_NAME_SUCCESS:
      let list: Slash[];
      console.log('action.payload');
      console.log(action.payload);
      if (action.payload[0]) {
        list = updateAndfilterUniqueItems(state.slashList.concat(action.payload.filter(s => !!s)))
      } else {
        list = [];
      }
      return Object.assign({}, state, {
        slashList: list,
        loading: false
      });

    case SlashActions.Types.GET_SLASHES_BY_NAME_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case SlashActions.Types.SET_CURRENT_SLASHES_ID:
      return Object.assign({}, state, {
        currentSlashesId: action.payload,
        loading: false
      });

    case SlashActions.Types.CREATE_SLASHES:
      return Object.assign({}, state, {loading: true, error: null});

    case SlashActions.Types.CREATE_SLASHES_SUCCESS:
      return Object.assign({}, state, {
        slashList: updateAndfilterUniqueItems(state.slashList.concat(action.payload)),
        loading: false
      });

    case SlashActions.Types.CREATE_SLASHES_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      })

    case SlashActions.Types.GET_SLASHES_BY_ID:
      return Object.assign({}, state, {loading: false, error: null});

    case SlashActions.Types.GET_SLASHES_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        slashList: updateAndfilterUniqueItems(state.slashList.concat(action.payload)),
        loading: false
      });

    case SlashActions.Types.GET_SLASHES_BY_ID_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case SlashActions.Types.CREATE_PRIVATE_SLASH:
      return Object.assign({}, state, {loading: true, error: null});

    case SlashActions.Types.CREATE_PRIVATE_SLASH_RESULT:
    console.log('Slash Creation');
    console.log(action.payload);
    return Object.assign({}, state, {
      loading: false
    });



    default:
        return state;
  }
}
