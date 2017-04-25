import { Post } from './post.model';
import { PostActions } from './post.actions';
import { updateAndfilterUniqueItems } from '../shared/helpers';

export interface PostState {
  postList: Post[];
  currentPostId: number;
  loading: false;
}

const initialPostState: PostState = {
  currentPostId: undefined,
  postList: [],
  loading: false
}

export function posts(state = initialPostState, action: PostActions.Actions): PostState {
  switch (action.type) {

    case PostActions.Types.GET_POSTS_BY_IDS:
      return Object.assign({}, state, {loading: true});

    case PostActions.Types.GET_POSTS_BY_IDS_SUCCESS:
      let newPostsList = updateAndfilterUniqueItems(state.postList.concat(action.payload));
      return Object.assign({}, state, {
        postList: newPostsList,
        loading: false
      });

    case PostActions.Types.GET_POSTS_BY_IDS_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      })


    case PostActions.Types.SET_CURRENT_POST_ID:
      return Object.assign({}, state, {
        currentPostId: action.payload,
        loading: false
      })

    case PostActions.Types.GET_POSTS_BY_USER_ID:
      return Object.assign({}, state, {loading: true, error: null});

    case PostActions.Types.GET_POSTS_BY_USER_ID_SUCCESS:
      return Object.assign({}, state, {
        postList: updateAndfilterUniqueItems(state.postList.concat(action.payload)),
        currentPostId: undefined,
        loading: false
      });

    case PostActions.Types.GET_POSTS_BY_USER_ID_FAIL:
      return Object.assign({}, state, {
        currentPostId: undefined,
        loading: false,
        error: 'Error!'
      });

    case PostActions.Types.CREATE_POST:
      return Object.assign({}, state, {loading: true, error: null});

    case PostActions.Types.CREATE_POST_SUCCESS:
      return Object.assign({}, state, {
        postList: updateAndfilterUniqueItems(state.postList.concat(action.payload)),
        loading: false
      });

    case PostActions.Types.CREATE_POST_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

      case PostActions.Types.LIKE_POST:
        return Object.assign({}, state, {loading: true, error: null});

      case PostActions.Types.LIKE_POST_SUCCESS:
        return Object.assign({}, state, {
          postList: updateAndfilterUniqueItems(state.postList.concat(action.payload)),
          loading: false
        });

      case PostActions.Types.CREATE_POST_FAIL:
        return Object.assign({}, state, {
          loading: false,
          error: action.payload
        });

    default:
      return state;
  }

}
