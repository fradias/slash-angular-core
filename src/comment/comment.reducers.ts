import { Comment } from './comment.model';
import { CommentActions } from './comment.actions';
import { updateAndfilterUniqueItems } from '../shared/helpers';

export interface CommentState {
  commentList: Comment[];
  loading: boolean;
}

const initialCommentState: CommentState = {
  commentList: [],
  loading: false
}

export function comments(state = initialCommentState, action: CommentActions.Actions): CommentState {
  switch (action.type) {
    case CommentActions.Types.GET_COMMENTS_BY_ID:
      return Object.assign({}, state, {loading: true, error: null});

    case CommentActions.Types.GET_COMMENTS_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        commentList: updateAndfilterUniqueItems(state.commentList.concat(action.payload)),
        loading: false,
      })

    case CommentActions.Types.GET_COMMENTS_BY_ID_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      })

    case CommentActions.Types.ADD_COMMENT:
      return Object.assign({}, state, {loading: true, error: null});

    case CommentActions.Types.ADD_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        commentList: state.commentList.concat(action.payload),
        loading: false
      });

    case CommentActions.Types.ADD_COMMENT_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      })

    case CommentActions.Types.DELETE_COMMENT:
      return Object.assign({}, state, {loading: true, error: null});

    case CommentActions.Types.DELETE_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        commentList: state.commentList.filter(c => c.id !== action.payload.id),
        loading: false,
      });

    case CommentActions.Types.DELETE_COMMENT_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });

    case CommentActions.Types.EDIT_COMMENT:
      return Object.assign({}, state, {loading: true, error: null});

    case CommentActions.Types.EDIT_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        commentList: updateAndfilterUniqueItems(state.commentList.concat(action.payload)),
        loading: false
      });

    case CommentActions.Types.EDIT_COMMENT_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });


    default:
      return state;
  }
}
