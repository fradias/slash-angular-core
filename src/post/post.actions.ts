import { Action } from '@ngrx/store';
import { type } from '../shared/type';
import { Post } from './post.model';

export namespace PostActions {

  export const Types = {
    GET_POSTS_BY_IDS: type('[Post] Get Posts By Ids '),
    GET_POSTS_BY_IDS_SUCCESS: type('[Post]  Get Posts By Ids Success'),
    GET_POSTS_BY_IDS_FAIL: type('[Post] Get Posts By Ids Fail'),
    SET_CURRENT_POST_ID: type('[Post] Set Current Post Id'),
    GET_POSTS_BY_USER_ID: type('[Post] Get Posts By User Id'),
    GET_POSTS_BY_USER_ID_SUCCESS: type('[Post] Get Posts By User Id Success'),
    GET_POSTS_BY_USER_ID_FAIL: type('[Post] Get Posts By User Id Fail'),
    CREATE_POST: type('[Post] Create Post'),
    CREATE_POST_SUCCESS: type('[Post] Create Post Success'),
    CREATE_POST_FAIL: type('[Post] Create Post Fail'),
    LIKE_POST: type('[Post] Like Post'),
    LIKE_POST_SUCCESS: type('[Post] Like Post Success'),
    LIKE_POST_FAIL: type('[Post] Like Post Fail'),
    DISLIKE_POST: type('[Post] Dislike Post'),
    DISLIKE_POST_SUCCESS: type('[Post] Dislike Post Success'),
    DISLIKE_POST_FAIL: type('[Post] Dislike Post Fail'),
  }

  export class GetPostsByIds implements Action {
    type = Types.GET_POSTS_BY_IDS;

    constructor(public payload: string[]) { }
  }

  export class GetPostsByIdsSuccess implements Action {
    type = Types.GET_POSTS_BY_IDS_SUCCESS;

    constructor(public payload: Post[]) { }
  }

  export class GetPostsByIdsFail implements Action {
    type = Types.GET_POSTS_BY_IDS_FAIL;

    constructor(public payload: any) { }
  }

  export class SetCurrentPostId implements Action {
    type = Types.SET_CURRENT_POST_ID;

    constructor(public payload: number) { }
  }


  export class GetPostsByUserId implements Action {
    type = Types.GET_POSTS_BY_USER_ID;

    constructor(public payload: string) { }
  }

  export class GetPostsByUserIdSuccess implements Action {
    type = Types.GET_POSTS_BY_USER_ID_SUCCESS;

    constructor(public payload: Post[]) { }
  }

  export class GetPostsByUserIdFail implements Action {
    type = Types.GET_POSTS_BY_USER_ID_FAIL;

    constructor(public payload: any) { }
  }

  export class CreatePost implements Action {
    type = Types.CREATE_POST;

    constructor(public payload: any) { }
  }

  export class CreatePostSuccess implements Action {
    type = Types.CREATE_POST_SUCCESS;

    constructor(public payload: Post) { }
  }

  export class CreatePostFail implements Action {
    type = Types.CREATE_POST_FAIL;

    constructor(public payload: any) { }
  }

  export class LikePost implements Action {
    type = Types.LIKE_POST;

    constructor(public payload: any) { }
  }

  export class LikePostSuccess implements Action {
    type = Types.LIKE_POST_SUCCESS;

    constructor(public payload: Post) { }
  }

  export class LikePostFail implements Action {
    type = Types.LIKE_POST_FAIL;

    constructor(public payload: any) { }
  }

  export class DislikePost implements Action {
    type = Types.DISLIKE_POST;

    constructor(public payload: any) { }
  }

  export type Actions
    = GetPostsByIds
    | GetPostsByIdsSuccess
    | GetPostsByIdsFail
    | SetCurrentPostId
    | GetPostsByUserId
    | GetPostsByUserIdSuccess
    | GetPostsByUserIdFail
    | CreatePost
    | CreatePostSuccess
    | CreatePostFail
    | LikePost
    | LikePostSuccess
    | LikePostFail
    | DislikePost

}
