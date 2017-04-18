import { Action } from '@ngrx/store';
import { type } from '../shared/type';

export namespace PullActions {

  export const Types = {
    ADD_ACTION: type('[Pull] Add Action'),
    REMOVE_ACTION: type('[Pull] Remove Action'),
    RESET_ACTIONS: type('[Pull] Reset Actions'),
    START_POOL: type('[Pull] Start Pool'),
    STOP_POOL: type('[Pull] Stop Pool'),
    PROCCESS_POOL: type('[Pull] Proccess Pool'),
    PROCCESS_POOL_FAIL: type('[Pull] Proccess Pool Fail'),


  }

  export class AddAction implements Action {
    type = Types.ADD_ACTION;

    constructor(public payload: any[]) { }
  }

  export class ResetActions implements Action {
    type = Types.RESET_ACTIONS;

    constructor(public payload: any) { }
  }

  export class StartPool implements Action {
    type = Types.START_POOL;

    constructor(public payload: any) { }
  }

  export class StopPool implements Action {
    type = Types.STOP_POOL;

    constructor(public payload: any) { }
  }

  export class ProccessPool implements Action {
    type = Types.PROCCESS_POOL;

    constructor(public payload: any) { }
  }

  export class ProccessPoolFail implements Action {
    type = Types.PROCCESS_POOL_FAIL;

    constructor(public payload: any) { }
  }


  export type Actions
    = AddAction
    | ResetActions
    | StartPool
    | StopPool
    | ProccessPool
    | ProccessPoolFail
}
