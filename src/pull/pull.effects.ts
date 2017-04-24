import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PullActions } from './pull.actions';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs/observable/timer';
import { SlashActions } from '../slash/slash.actions';
import { UserActions } from '../user/user.actions';


@Injectable()
export class PullEffects {

  constructor(
    private actions$: Actions,
    private store: Store<any>
  ) {

  }

  @Effect() addAction = this.actions$
    .ofType(PullActions.Types.ADD_ACTION)
    .switchMap(action =>{
      console.log(action);
      return Observable.from(action.payload.map(a => a.act))
    });

  @Effect() startPool$ = this.actions$
    .ofType(PullActions.Types.START_POOL)
    .switchMap(action => of(new PullActions.ProccessPool({})));

  @Effect() proccessPool$ = this.actions$
    .ofType(PullActions.Types.PROCCESS_POOL)
    .switchMap(action => {
      let obs = Observable.timer(5000, 8000);
      return obs.switchMap(() => {
        return this.store.switchMap(store => {
          if (store.pullState.started) {
            return Observable.from(
              store.pullState.actions.map(a => a.act).concat(new PullActions.ProccessPool({}))
            );
          }
        })
      })
    });

  @Effect() resetActions$ = this.actions$
    .ofType(PullActions.Types.RESET_ACTIONS)
    .switchMap(action => of(new PullActions.StopPool({})));

}
