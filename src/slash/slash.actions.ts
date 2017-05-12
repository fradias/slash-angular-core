import { Action } from '@ngrx/store';
import { type } from '../shared/type';
import { Slash } from './slash.model';

export namespace SlashActions {

  export const Types = {
    GET_SLASHES: type('[Slash] Get Slashes'),
    GET_SLASHES_SUCCESS: type('[Slash] Get Slashes Success'),
    GET_SLASHES_FAIL: type('[Slash] Get Slashes Fail'),
    SET_CURRENT_SLASHES_ID: type('[Slash] Set Current Slashes Id'),
    SET_CURRENT_SLASHES_ID_SUCCESS: type('[Slash] Set Current Slashes Id Success'),
    SET_CURRENT_SLASHES_ID_FAIL: type('[Slash] Set Current Slashes IdFail'),
    GET_SLASHES_BY_NAME: type('[Slash] Get Slashes By Name'),
    GET_SLASHES_BY_NAME_SUCCESS: type('[Slash] Get Slashes By Name Success'),
    GET_SLASHES_BY_NAME_FAIL: type('[Slash] Get Slashes By Name Fail'),
    CREATE_SLASHES: type('[Slash] Create Slashes'),
    CREATE_SLASHES_SUCCESS: type('[Slash] Create Slashes Success'),
    CREATE_SLASHES_FAIL: type('[Slash] Create Slashes Fail'),
    GET_SLASHES_BY_ID: type('[Slash] Get Slashes By Id'),
    GET_SLASHES_BY_ID_SUCCESS: type('[Slash] Get Slashes By Id Success'),
    GET_SLASHES_BY_ID_FAIL: type('[Slash] Get Slashes By Id Fail'),
    CREATE_PRIVATE_SLASH: type('[Slash] Create Private Slash'),
    CREATE_PRIVATE_SLASH_RESULT: type('[Slash] Create Private Slash Result'),
    GET_PRIVATE_SLASH_BY_NAME: type('[Slash] Get Private Slash By Name'),
    GET_PRIVATE_SLASH_BY_NAME_SUCCESS: type('[Slash] Get Private Slash By Name Success'),
    GET_PRIVATE_SLASH_BY_NAME_FAIL: type('[Slash] Get Private Slash By Name Fail'),
    SLASH_LOGIN: type('[Slash] Slash Login'),
    SLASH_LOGIN_SUCCESS: type('[Slash] Slash Login Success'),
    SLASH_LOGIN_FAIL: type('[Slash] Slash Login Fail'),


  }

  export class GetSlashes implements Action {
    type = Types.GET_SLASHES;
    payload = {};
    constructor() { }
  }

  export class GetSlashesSuccess implements Action {
    type = Types.GET_SLASHES_SUCCESS;

    constructor(public payload: Slash[]) { }
  }

  export class GetSlashesFail implements Action {
    type = Types.GET_SLASHES_FAIL;

    constructor(public payload: any) { }
  }

  export class SetCurrentSlashesNames implements Action {
    type = Types.SET_CURRENT_SLASHES_ID;

    constructor(public payload: string[]) { }
  }

  export class SetCurrentSlashesNamesSuccess implements Action {
    type = Types.SET_CURRENT_SLASHES_ID_SUCCESS;

    constructor(public payload: string[]) { }
  }

  export class SetCurrentSlashesNamesFail implements Action {
    type = Types.SET_CURRENT_SLASHES_ID_FAIL;

    constructor(public payload: any) { }
  }

  export class GetSlashesByName implements Action {
    type = Types.GET_SLASHES_BY_NAME;

    constructor(public payload: string[]) { }
  }

  export class GetSlashesByNameSuccess implements Action {
    type = Types.GET_SLASHES_BY_NAME_SUCCESS;

    constructor(public payload: Slash[]) { }
  }

  export class GetSlashesByNameFail implements Action {
    type = Types.GET_SLASHES_BY_NAME_FAIL;

    constructor(public payload: any) { }
  }

  export class CreateSlashes implements Action {
    type = Types.CREATE_SLASHES;

    constructor(public payload: any) { }
  }

  export class CreateSlashesSuccess implements Action {
    type = Types.CREATE_SLASHES_SUCCESS;

    constructor(public payload: Slash[]) { }
  }

  export class CreateSlashesFail implements Action {
    type = Types.CREATE_SLASHES_FAIL;

    constructor(public payload: any) { }
  }

  export class GetSlashesById implements Action {
    type = Types.GET_SLASHES_BY_ID;

    constructor(public payload: any[]) { }
  }

  export class GetSlashesByIdSuccess implements Action {
    type = Types.GET_SLASHES_BY_ID_SUCCESS;

    constructor(public payload: Slash[]) { }
  }

  export class GetSlashesByIdFail implements Action {
    type = Types.GET_SLASHES_BY_ID_FAIL;

    constructor(public payload: any) { }
  }

  export class CreatePrivateSlash implements Action {
    type = Types.CREATE_PRIVATE_SLASH;

    constructor(public payload: any) { }
  }

  export class CreatePrivateSlashResult implements Action {
    type = Types.CREATE_PRIVATE_SLASH_RESULT;

    constructor(public payload: any) { }
  }

  export class GetPrivateSlashByName implements Action {
    type = Types.GET_PRIVATE_SLASH_BY_NAME;

    constructor(public payload: string) { }
  }

  export class GetPrivateSlashByNameSuccess implements Action {
    type = Types.GET_PRIVATE_SLASH_BY_NAME_SUCCESS;

    constructor(public payload: Slash) { }
  }

  export class GetPrivateSlashByNameFail implements Action {
    type = Types.GET_PRIVATE_SLASH_BY_NAME_FAIL;

    constructor(public payload: any) { }
  }

  export class SlashLogin implements Action {
    type = Types.SLASH_LOGIN;

    constructor(public payload: any) { }
  }

  export class SlashLoginSuccess implements Action {
    type = Types.SLASH_LOGIN_SUCCESS;

    constructor(public payload: any) { }
  }

  export class SlashLoginFail implements Action {
    type = Types.SLASH_LOGIN_FAIL;

    constructor(public payload: any) { }
  }

  export type Actions
    = GetSlashes
    | GetSlashesSuccess
    | GetSlashesFail
    | SetCurrentSlashesNames
    | SetCurrentSlashesNamesSuccess
    | SetCurrentSlashesNamesFail
    | GetSlashesByName
    | GetSlashesByNameSuccess
    | GetSlashesByNameFail
    | CreateSlashes
    | CreateSlashesSuccess
    | CreateSlashesFail
    | GetSlashesById
    | GetSlashesByIdSuccess
    | GetSlashesByIdFail
    | CreatePrivateSlash
    | CreatePrivateSlashResult
    | GetPrivateSlashByName
    | GetPrivateSlashByNameSuccess
    | GetPrivateSlashByNameFail
    | SlashLogin
    | SlashLoginSuccess
    | SlashLoginFail
}
