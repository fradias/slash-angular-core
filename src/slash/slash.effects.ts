import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SlashActions } from './slash.actions';
import { SlashService } from '../';
import { Slash } from './slash.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { ManagerActions } from '../manager/manager.actions';


@Injectable()
export class SlashEffects {

  constructor(
    private actions$: Actions,
    private slashService: SlashService,
  ) {

  }

  @Effect() getSlashes$ = this.actions$
    .ofType(SlashActions.Types.GET_SLASHES)
    .switchMap(action =>
      this.slashService.getSlashes(10)
        .map((slashes: Slash[]) => new SlashActions.GetSlashesSuccess(slashes))
        .catch((e) => of(new SlashActions.GetSlashesFail(e)))
    );

  @Effect() getSlashesByName$ = this.actions$
    .ofType(SlashActions.Types.GET_SLASHES_BY_NAME)
    .switchMap(action =>
      this.slashService.ngrxGetSlashesByName(action.payload)
        .map((slashes: Slash[]) => new SlashActions.GetSlashesByNameSuccess(slashes))
        .catch((e) => of(new SlashActions.GetSlashesByNameFail(e)))
    );

  @Effect() createSlashes$ = this.actions$
    .ofType(SlashActions.Types.CREATE_SLASHES)
    .switchMap(action =>
      this.slashService.ngrxCreateSlashes(action.payload.data)
        .map((slashes: Slash[]) => {
          if (action.payload.callback) {
            action.payload.callback(null,slashes)
          }
          let a = slashes.map(slash => {
            return Object.assign({}, slash, {posts: []})
          })
          console.log('EFFECT CREATE_SLASHES');
          console.log(a);
          return new SlashActions.CreateSlashesSuccess(a);
        })
        .catch((e) => {
          if (action.payload.callback) {
            action.payload.callback(e);
          }
          return of (new SlashActions.CreateSlashesFail(e))
        }));

    @Effect() getSlashesById = this.actions$
      .ofType(SlashActions.Types.GET_SLASHES_BY_ID)
      .switchMap(action =>
        this.slashService.ngrxGetSlashesById(action.payload)
          .map((slashes: Slash[]) => new SlashActions.GetSlashesByIdSuccess(slashes))
          .catch((e) => of(new SlashActions.GetSlashesByIdFail(e)))
      );

    @Effect() createPrivateSlash$ = this.actions$
      .ofType(SlashActions.Types.CREATE_PRIVATE_SLASH)
      .switchMap(action =>
        this.slashService.createPrivateSlash(action.payload)
          .map((res) => new SlashActions.CreatePrivateSlashResult(res))
          .catch((e) => of(new SlashActions.CreatePrivateSlashResult(e)))
      );

    @Effect() getPrivateSlashByName$ = this.actions$
      .ofType(SlashActions.Types.GET_PRIVATE_SLASH_BY_NAME)
      .switchMap(action =>
        this.slashService.getSlashByName(action.payload)
          .map((res) => new SlashActions.GetPrivateSlashByNameSuccess(res))
          .catch((e) => of(new SlashActions.GetPrivateSlashByNameFail(e)))
      );

    @Effect() slashLogin$ = this.actions$
      .ofType(SlashActions.Types.SLASH_LOGIN)
      .mergeMap(action =>
        this.slashService.slashLogin(action.payload)
          .mergeMap((data) => {
            if (data.error) {
              return of(new SlashActions.SlashLoginFail(data.error))
            }
            let obj = {};
            obj[data.slash.name] = data.token;
            return Observable.from([
              new SlashActions.SlashLoginSuccess(data.slash),
              new ManagerActions.AddSlashToken(obj)
            ]);
          })
          .catch((e) => of(new SlashActions.SlashLoginFail(e)))
      );


}
