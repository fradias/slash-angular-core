import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/let";
import {combineReducers} from "@ngrx/store";
import {compose} from "@ngrx/core/compose";
import {storeLogger} from "ngrx-store-logger";
import {storeFreeze} from "ngrx-store-freeze";
import { posts } from './post/post.reducer';
import { comments } from './comment/comment.reducers';
import { users } from './user/user.reducers';
import { slashes } from './slash/slash.reducers';
import { manager } from './manager/manager.reducers';
import { pull } from './pull/pull.reducers';
import {environment} from "./environments/environment";

const AppReducers = {
  postState: posts,
  commentState: comments,
  userState: users,
  slashState: slashes,
  managerState: manager,
  pullState: pull,
};
const developmentReducer = compose(
    storeFreeze, storeLogger(), combineReducers
)(Object.assign(AppReducers));
const productionReducer = combineReducers(Object.assign(AppReducers));

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    }
    else {
        return developmentReducer(state, action);
    }
}
