import { Action } from '@ngrx/store';
import { type } from '../shared/type';
import { User } from '../user/user.model';

export namespace ManagerActions {

  export const Types = {
    MANAGER_LOGIN: type('[Manger] Maneger Login'),
    MANAGER_LOGIN_SUCCESS: type('[Manager] Manager Login Success'),
    MANAGER_LOGIN_FAIL: type('[Manager] Manager Login Fail'),
    MANAGER_LOGOUT: type('[Manager] Manager Logout'),
    MANAGER_LOGOUT_SUCCESS: type('[Manager] Manager Logout Success'),
    MANAGER_LOGOUT_FAIL: type('[Manager] Manager Logout Fail'),
    GET_LOCAL_TOKENS: type('[Manager] Get LocalStorage Tokens'),
    ADD_SLASH_TOKEN: type('[Manager] Add Slash Token'),
  }

  export class ManagerLogin implements Action {
    type = Types.MANAGER_LOGIN;

    constructor(public payload: any) { }
  }

  export class ManagerLoginSuccess implements Action {
    type = Types.MANAGER_LOGIN_SUCCESS;

    constructor(public payload: any) { }
  }

  export class ManagerLoginFail implements Action {
    type = Types.MANAGER_LOGIN_FAIL;

    constructor(public payload: any) { }
  }

  export class ManagerLogout implements Action {
    type = Types.MANAGER_LOGOUT;
    payload = {};
    constructor() { }
  }

  export class ManagerLogoutSuccess implements Action {
    type = Types.MANAGER_LOGOUT_SUCCESS;
    payload = {};
    constructor() { }
  }

  export class ManagerLogoutFail implements Action {
    type = Types.MANAGER_LOGOUT_FAIL;

    constructor(public payload: any) { }
  }

  export class GetLocalTokens implements Action {
    type = Types.GET_LOCAL_TOKENS;

    constructor(public payload: any) { }
  }

  export class AddSlashToken implements Action {
    type = Types.ADD_SLASH_TOKEN;

    constructor(public payload: any) { }
  }


  export type Actions
    = ManagerLogin
    | ManagerLoginSuccess
    | ManagerLoginFail
    | ManagerLogout
    | ManagerLogoutSuccess
    | ManagerLogoutFail
    | GetLocalTokens
    | AddSlashToken
}
