import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CommentActions } from './comment.actions';
import { CommentService } from '../';
import { of } from 'rxjs/observable/of';
import { Comment } from './comment.model';
import { PostActions } from '../post/post.actions';
import { Observable } from 'rxjs';


@Injectable()
export class CommentEffects {

  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) {

  }

  @Effect() getCommentsById$ = this.actions$
    .ofType(CommentActions.Types.GET_COMMENTS_BY_ID)
    .switchMap(action =>
      this.commentService.ngrxFindCommentsById(action.payload)
        .map((comments: Comment[]) => new CommentActions.GetCommentsByIdSuccess(comments))
        .catch((e) => of(new CommentActions.GetCommentsByIdFail(e)))
    )

  @Effect() addComment$ = this.actions$
    .ofType(CommentActions.Types.ADD_COMMENT)
    .switchMap(action =>
      this.commentService.createComment(action.payload)
        .map((comment: Comment) => new CommentActions.AddCommentSuccess(comment))
        .catch((e) => of(new CommentActions.AddCommentFail(e)))
    )

  @Effect() addCommentSuccess$ = this.actions$
    .ofType(CommentActions.Types.ADD_COMMENT_SUCCESS)
    .map(action => {
      let postid: any[] = [{id: action.payload.post.id}]
      return new PostActions.GetPostsByIds(postid)
    })

  @Effect() deleteComment$ = this.actions$
    .ofType(CommentActions.Types.DELETE_COMMENT)
    .switchMap(action =>
      this.commentService.ngrxDeleteCommentById(action.payload)
        .map((c: Comment) => new CommentActions.DeleteCommentSuccess(c))
        .catch((e) => of(new CommentActions.DeleteCommentFail(e)))
    )

  @Effect() editComment$ = this.actions$
    .ofType(CommentActions.Types.EDIT_COMMENT)
    .switchMap(action =>
      this.commentService.editComment(action.payload)
        .map((comment: Comment) => new CommentActions.EditCommentSuccess(comment))
        .catch((e) => of(new CommentActions.EditCommentFail(e)))
    )

  @Effect() testHeader$ = this.actions$
    .ofType(CommentActions.Types.TEST_HEADER)
    .switchMap(action =>
      this.commentService.testHeaders()
        .map(res => {
          console.log("TEST_HEADER Effect");
          console.log(res);
        })
        .catch((e) => {
          console.log("TEST_HEADER Effect");
          console.log(e);
          return of(e)
        })
    )
}
