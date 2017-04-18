import { Action } from '@ngrx/store';
import { type } from '../shared/type';
import { User } from './user.model';

export namespace UserActions {

  export const Types = {
    GET_USERS_BY_ID: type('[User] Get Users By Id'),
    GET_USERS_BY_ID_SUCCESS: type('[User] Get Users By Id Success'),
    GET_USERS_BY_ID_FAIL: type('[User] Get Users By Id Fail'),
  }

  export class GetUsersByid implements Action {
    type = Types.GET_USERS_BY_ID;

    constructor(public payload: string[]) { }
  }

  export class GetUsersByIdSuccess implements Action {
    type = Types.GET_USERS_BY_ID_SUCCESS;

    constructor(public payload: User[]) { }
  }

  export class GetUsersByIdFail implements Action {
    type = Types.GET_USERS_BY_ID_FAIL;

    constructor(public payload: any) { }
  }


  export type Actions
    = GetUsersByid
    | GetUsersByIdSuccess
    | GetUsersByIdFail
}
