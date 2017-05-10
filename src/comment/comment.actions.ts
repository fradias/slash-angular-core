import { Action } from '@ngrx/store';
import { type } from '../shared/type';
import { Comment } from './comment.model';

export namespace CommentActions {

  export const Types = {
    GET_COMMENTS_BY_ID: type('[Comment] Get Comments By Id'),
    GET_COMMENTS_BY_ID_SUCCESS: type('[Comment] Get Comments By Id Success'),
    GET_COMMENTS_BY_ID_FAIL: type('[Comment] Get Comments By Id Fail'),
    ADD_COMMENT: type('[Comment] Add Comment'),
    ADD_COMMENT_SUCCESS: type('[Comment] Add Comment Success'),
    ADD_COMMENT_FAIL: type('[Comment] Add Comment Fail'),
    DELETE_COMMENT: type('[Comment] Delete Comment'),
    DELETE_COMMENT_SUCCESS: type('[Comment] Delete Comment Success'),
    DELETE_COMMENT_FAIL: type('[Comment] Delete Comment Fail'),
    EDIT_COMMENT: type('[Comment] Edit Comment'),
    EDIT_COMMENT_SUCCESS: type('[Comment] Edit Comment Success'),
    EDIT_COMMENT_FAIL: type('[Comment] Edit Comment Fail'),
    TEST_HEADER: type('[HEADER] Test Header')

  }

  export class GetCommentsById implements Action {
    type = Types.GET_COMMENTS_BY_ID;

    constructor(public payload: any[]) { }
  }

  export class GetCommentsByIdSuccess implements Action {
    type = Types.GET_COMMENTS_BY_ID_SUCCESS;

    constructor(public payload: Comment[]) { }
  }

  export class GetCommentsByIdFail implements Action {
    type = Types.GET_COMMENTS_BY_ID_FAIL;

    constructor(public payload: any) { }
  }

  export class AddComment implements Action {
    type = Types.ADD_COMMENT;

    constructor(public payload: any) { }
  }

  export class AddCommentSuccess implements Action {
    type = Types.ADD_COMMENT_SUCCESS;

    constructor(public payload: Comment) { }
  }

  export class AddCommentFail implements Action {
    type = Types.ADD_COMMENT_FAIL;

    constructor(public payload: any) {}
  }

  export class DeleteComment implements Action {
    type = Types.DELETE_COMMENT;

    constructor(public payload: Comment) { }
  }

  export class DeleteCommentSuccess implements Action {
    type = Types.DELETE_COMMENT_SUCCESS;

    constructor(public payload: Comment) { }
  }

  export class DeleteCommentFail implements Action {
    type = Types.DELETE_COMMENT_FAIL;

    constructor(public payload: any) { }
  }

  export class EditComment implements Action {
    type = Types.EDIT_COMMENT;

    constructor(public payload: Comment) { }
  }

  export class EditCommentSuccess implements Action {
    type = Types.EDIT_COMMENT_SUCCESS;

    constructor(public payload: Comment) { }
  }

  export class EditCommentFail implements Action {
    type = Types.EDIT_COMMENT_FAIL;

    constructor(public payload: any) { }
  }

  export class TestHeader implements Action {
    type = Types.TEST_HEADER;

    constructor(public payload: any) {}
  }





  export type Actions
    = GetCommentsById
    | GetCommentsByIdSuccess
    | GetCommentsByIdFail
    | AddComment
    | AddCommentSuccess
    | AddCommentFail
    | DeleteComment
    | DeleteCommentSuccess
    | DeleteCommentFail
    | EditComment
    | EditCommentSuccess
    | EditCommentFail
    | TestHeader
}
