import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PostActions } from './post.actions';
import { PostService } from '../';
import { of } from 'rxjs/observable/of';
import { Post } from './post.model';
import { SlashActions } from '../slash/slash.actions';
import { Observable } from 'rxjs';


@Injectable()
export class PostEffects {

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) {

  }

  @Effect() getPostsByIds$ = this.actions$
    .ofType(PostActions.Types.GET_POSTS_BY_IDS)
    .switchMap(action =>
      this.postService.ngrxGetPostById(action.payload)
        .map((posts: Post[]) => new PostActions.GetPostsByIdsSuccess(posts))
        .catch((e) => of(new PostActions.GetPostsByIdsFail(e)))
    );


  @Effect() getPostsByUserId$ = this.actions$
    .ofType(PostActions.Types.GET_POSTS_BY_USER_ID)
    .switchMap(action =>
      this.postService.ngrxFindPostByUserId(action.payload)
        .map((posts: Post[]) => new PostActions.GetPostsByUserIdSuccess(posts))
        .catch((e) => of(new PostActions.GetPostsByUserIdFail(e)))
    );

  @Effect() createPost$ = this.actions$
    .ofType(PostActions.Types.CREATE_POST)
    .switchMap(action =>
      this.postService.createPost(action.payload)
        .map((post: Post) => new PostActions.CreatePostSuccess(post))
        .catch((e) => of(new PostActions.GetPostsByUserIdFail(e)))
    );

  @Effect() updateSlashesList$ = this.actions$
    .ofType(PostActions.Types.CREATE_POST_SUCCESS)
    .map(action => {
      let slashesId: any[] = action.payload.slashes
      return new SlashActions.GetSlashesById(slashesId)
    });

  @Effect() likePost$ = this.actions$
    .ofType(PostActions.Types.LIKE_POST)
    .switchMap(action =>
      this.postService.likePost(action.payload)
        .map((post: Post) => new PostActions.LikePostSuccess(post)) // podria re-usar PostActions.CreatePostSuccess(posts)
        .catch((e) => of(new PostActions.LikePostFail(e)))
    );

  @Effect() dislikePost$ = this.actions$
    .ofType(PostActions.Types.DISLIKE_POST)
    .switchMap(action =>
      this.postService.dislikePost(action.payload)
      .map((post: Post) => new PostActions.LikePostSuccess(post)) // podria re-usar PostActions.CreatePostSuccess(posts)
      .catch((e) => of(new PostActions.LikePostFail(e)))
    );

  @Effect() editPost$ = this.actions$
    .ofType(PostActions.Types.EDIT_POST)
    .switchMap(action =>
      this.postService.editPost(action.payload)
        .map((post: Post) => new PostActions.EditPostSuccess(post))
        .catch((e) => of(new PostActions.EditPostFail(e)))
    );
}
