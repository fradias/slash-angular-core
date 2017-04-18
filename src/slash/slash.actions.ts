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

  export class SetCurrentSlashesId implements Action {
    type = Types.SET_CURRENT_SLASHES_ID;

    constructor(public payload: string[]) { }
  }

  export class SetCurrentSlashesIdSuccess implements Action {
    type = Types.SET_CURRENT_SLASHES_ID_SUCCESS;

    constructor(public payload: string[]) { }
  }

  export class SetCurrentSlashesIdFail implements Action {
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






  export type Actions
    = GetSlashes
    | GetSlashesSuccess
    | GetSlashesFail
    | SetCurrentSlashesId
    | SetCurrentSlashesIdSuccess
    | SetCurrentSlashesIdFail
    | GetSlashesByName
    | GetSlashesByNameSuccess
    | GetSlashesByNameFail
    | CreateSlashes
    | CreateSlashesSuccess
    | CreateSlashesFail
    | GetSlashesById
    | GetSlashesByIdSuccess
    | GetSlashesByIdFail
}
