import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, RequestMethod } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';

import { Comment } from '../comment/comment.model';
import { API } from '../environments/environment';

import { BaseApi } from '../shared/base-api';
import { AuthTokenStorageService } from '../auth/auth-token.service';


@Injectable()
export class CommentService extends BaseApi {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  APIcomments = 'http://localhost:8080/comment';

  commentState$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private store: Store<any>,
    http: Http,
    authTokenStorageService: AuthTokenStorageService,
  ){
    super(authTokenStorageService, http);
  }

  initializingCommentState() {
    let comments: any[] = [];
    let commentState = {
      list: comments,
      loading: false
    }
    this.commentState$.next(commentState);
  }

  getComment(id){
    return this.http.get(API.comments + `${id}`)
      .map(res => res.json());
  }

  createComment(comment) {
    return this.request({
      body: comment,
      method: RequestMethod.Post,
      url: API.comments + 'create/'
    })
    /*return this.http
      .post(API.comments + 'create/', comment, this.options)
      .map(res => res.json());*/
  }

  deleteComment(comment: Comment) {
    return this.request({
      body: {model: comment},
      method: RequestMethod.Post,
      url: API.comments + 'remove/'
    });
  }

  editComment(comment: Comment) {
    return this.request({
      body: comment,
      method: RequestMethod.Post,
      url: API.comments + `${comment.id}`
    })
    /*return this.http
      .post(API.comments + `${comment.id}`, comment, this.options)
      .map(res => res.json());*/
  }

  findCommentsById(ids: any[], callback?: any) {
    console.log('Entro a findCommentsById!!!!!!!!!!!!!!');
    if (ids) {
      Observable.forkJoin(
        ids.map(id => {
          return this.getComment(id)
        })
      ).subscribe(comments => {
        console.log(comments);
        this.commentState$.take(1).subscribe(commentState => {
          let newComments = commentState.list.concat(comments);
          this.commentState$.next(Object.assign({}, commentState, {
            list: newComments
          }))
        })
      })
    }
  }

  addNewComment(comment, callback) {
    this.createComment(comment).subscribe(newComment => {
      this.commentState$.take(1).subscribe(commentState => {
        let newComments = commentState.list.concat(newComment);
        this.commentState$.next(Object.assign({}, commentState, {
          list: newComments
        }))
        return callback(newComment);
    });
  })
}

eraseComment(id) {
  this.deleteComment(id).subscribe(deletedComment => {
    this.commentState$.take(1).subscribe(commentState => {
      let comments = commentState.list.filter(comment => comment.id !== id);
      this.commentState$.next(Object.assign({}, commentState, {
        list: comments
      }))
    })
  })
}

enableEditingComment(commentToEdit) {
  this.commentState$.take(1).subscribe(commentState => {
    let updatedComments = commentState.list.map(comment => {
      if (comment.id == commentToEdit.id) {
        return Object.assign({}, commentToEdit, {
          editing: true
        });
      }
      return comment;
    })
    this.commentState$.next(Object.assign({}, commentState, {
      list: updatedComments
    }))
  })
}

editingComment(comment, callback?: any) {
  this.editComment(comment).subscribe(commentFromApi => {
    if (!commentFromApi) {
      if (callback) {
        return callback('COMMENT_NOT_FOUND');
      }
    }
    this.commentState$.take(1).subscribe(commentState => {
      let comments = commentState.list;
      if (comments.find(comment => comment.id === commentFromApi.id)) {
        let newComments = comments.map(comment => {
          if (comment.id == commentFromApi.id) {
            return commentFromApi;
          }
          return comment;
        })
        this.commentState$.next(Object.assign({}, commentState, {
          list: newComments
        }))
        if (callback) {
          return callback(null, newComments);
        }
      } else {
        comments = comments.concat(commentFromApi);
        this.commentState$.next(Object.assign({}, commentState, {
          list: comments
        }));
        if (callback) {
          return callback(null, comments);
        }
      }
    })
  });
}

// USING HEADERS -----------------------------------------------------------

  testHeaders() {
    let body = {
      id: '1',
      status: 'test'
    }
    return this.request({
      body,
      method: RequestMethod.Post,
      url: 'http://localhost:3000/headers/'
    })
  }



// NGRX -----------------------------------------------------------

ngrxFindCommentsById(ids: any[]) {
  console.log(ids);
  return Observable.forkJoin(
    ids.map(id => {
      return this.getComment(id.id);
    })
  ).delay(1000);
}

ngrxDeleteCommentById(comment: Comment) {
  return this.deleteComment(comment);
}



// NGRX Selectors --------------------------------------------------

ngrxGetCommentsByIdSelector(commentsIds) {
  console.log(commentsIds);
  return this.store.map(store => {
    return store.commentState.commentList.map(comment => {
      if (commentsIds.find(c => c.id === comment.id)) {
        return comment;
      }
    })
  }).filter(comment => !!comment);
}

ngrxGetCommentsOfPostBU() {
  return this.store.map(store => {
    return store.postState.currentPost.comments.map(comment =>
      store.commentState.commentList.find(c => c.id === comment.id) ||
      Object.assign({}, comment, {loading: true})
    )
  });
}

ngrxGetCommentsOfPost() {
  return this.store.map(store => {
    return store.commentState.commentList.filter(comment => comment.post.id === store.postState.currentPostId)
  })
}


// Selectors

getComments(commentsId) {
  return this.commentState$.map(commentState => {
    if (!commentState.list.length) {
      return commentState.list;
    } else {
      let commentsToShow: any[] = [];
      commentState.list.map(comment => {
        if (commentsId.find(c => c.id === comment.id)) {
          commentsToShow.push(comment);
        }
      })
      return commentsToShow;
    }
  });
}

getCommentsByPostId(postId) {
  return this.commentState$.map(commentState => {
    if (postId) {
      return commentState.list.filter(comment => comment.post.id === postId)
    }
  })
}


// Utilities

checkCommentState() {
  this.commentState$.take(1).subscribe(commentState => console.log(commentState));
}

}
