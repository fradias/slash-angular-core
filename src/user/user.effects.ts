import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserService } from '../';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {

  }

  @Effect() getUsersById$ = this.actions$
    .ofType(UserActions.Types.GET_USERS_BY_ID)
    .switchMap(action =>
      this.userService.ngrxFindUsersById(action.payload)
        .map((users: User[]) => new UserActions.GetUsersByIdSuccess(users))
        .catch((e) => of(new UserActions.GetUsersByIdFail(e)))
    )
}
