import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ManagerActions } from './manager.actions';
import { User } from '../user/user.model';
import { UserActions } from '../user/user.actions';
import { UserService } from '../';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ManagerEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {

  }

  /*@Effect() managerLogin$ = this.actions$
    .ofType(ManagerActions.Types.MANAGER_LOGIN)
    .switchMap(action =>
      this.userService.ngrxLogin(action.payload.data.user)
        .map((user: User) => {
          if (action.payload.callback) {
            action.payload.callback(null,user);
          }
          return new ManagerActions.ManagerLoginSuccess(user)
        })
        .catch((e) => {
          if (action.payload.callback) {
            action.payload.callback(e);
          }
          return of(new ManagerActions.ManagerLoginFail(e))
        })
    );*/

  @Effect() managerLogin$ = this.actions$
    .ofType(ManagerActions.Types.MANAGER_LOGIN)
    .switchMap(action =>
      this.userService.login(action.payload.data)
        .map((res) => {
          console.log('RESPONSE');
          console.log(res);
          if (action.payload.callback) {
            action.payload.callback(null,res.user);
          }
          return new ManagerActions.ManagerLoginSuccess(res)
        })
        .catch((e) => {
          if (action.payload.callback) {
            action.payload.callback(e);
          }
          return of(new ManagerActions.ManagerLoginFail(e))
        })
    );

  @Effect() addLoggedUserToList$ = this.actions$
    .ofType(ManagerActions.Types.MANAGER_LOGIN_SUCCESS)
    .map(action => new UserActions.GetUsersByIdSuccess([action.payload.user]));

}
