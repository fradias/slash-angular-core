import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, RequestMethod } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { SlashService } from './slash.service';
import 'rxjs/add/observable/forkJoin';

import { Post } from '../post/post.model';
import { API } from '../environments/environment';


import { updateAndfilterUniqueItems } from '../shared/helpers';

import { BaseApi } from '../shared/base-api';
import { AuthTokenStorageService } from '../auth/auth-token.service';


@Injectable()
export class PostService extends BaseApi {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  postState$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  APIurl = 'http://localhost:8080/post';
  APIusers = 'http://localhost:8080/user';

  constructor(
    http: Http,
    authTokenStorageService: AuthTokenStorageService,
    private slashService: SlashService,
    private store: Store<any>,
  ){
    super(authTokenStorageService,http);
  }

  initializingPostState() {
    let posts: any[] = []
    let postState = {
      list: posts,
      currentPost: undefined,
      loading: false
    }
    this.postState$.next(postState);
  }

  getPosts() {
  return  this.http.get(API.posts + '?max=100')
              .map(res => res.json());
  }

  createPost(post) {
    return this.request({
      body: post,
      method: RequestMethod.Post,
      url: API.posts + 'create/'
    })

    /*return this.http
      .post(API.posts + 'create/', post, this.options)
      .map(res => res.json())*/
  }

  deletePost(post) {
    let url = `${this.APIurl}/${post.id}`;
    return this.http
      .put(url, post, this.options)
      .map(() => {
        console.log('grabo');
        return post;
      })
  }

  getPost(postID) {
    return this.http
      .get(API.posts + `${postID}`)
      .map(res => res.json());
  }

  editPost(post: Post){
    return this.request({
      body: post,
      method: RequestMethod.Post,
      url: API.posts + `${post.id}`
    })
  }

  findPostById(ids) {
    Observable.forkJoin(
      ids.map(id => {
       return this.getPost(id.id)
      })
    ).subscribe(postsFromApi => {
      this.postState$.take(1).subscribe(postState => {
        let newPosts = updateAndfilterUniqueItems(postState.list.concat(postsFromApi));
        this.postState$.next(Object.assign({}, postState, {
          list: newPosts
        }))
      })
    })
  }

  findPostByUserId(userId: string, callback?: any) {
    this.getPosts().subscribe(postsFromApi => {
      if (!postsFromApi) {
        if (callback) {
          return callback('POSTS_NOT_FOUND');
        }
        return;
      }
      this.postState$.take(1).subscribe(postState => {
        let userPosts = postsFromApi.filter(post => post.user.id === userId);
        let newPosts = updateAndfilterUniqueItems(postState.list.concat(userPosts));
        this.postState$.next(Object.assign({}, postState, {
          list: newPosts
        }))
      })
    })
  }

  addingNewPost(post, currentSlash, slashName, callback?: any) {
    this.createPost(post).subscribe(newPostFromApi => {
      if (!newPostFromApi) {
        if (callback) {
          return callback('ERROR_FAIL_TO_CREATE');
        }
        return;
      }
      this.slashService.updateSlashState2(currentSlash, () => {
        this.postState$.take(1).subscribe(postState => {
          let newPostsList = postState.list.concat(newPostFromApi);
          this.postState$.next(Object.assign({}, postState, {
            list: newPostsList
          }))
          if (callback) {
            return callback(null, newPostFromApi);
          }
        })
      })
    })
  }

  erasingPost(post, currentSlash) {
    this.deletePost(post).subscribe(deletedPost => {
      this.slashService.updateSlashState2(currentSlash, () => {
        this.postState$.take(1).subscribe(postState => {
          let postsList = postState.list.filter(post => post.id !== deletedPost.id);
          this.postState$.next(Object.assign({}, postState, {
            list: postsList
          }))
        })
      })
    })
  }

  setCurrentPost(postId, callback:any) {
    this.getPost(postId).subscribe(currentPostFromApi => {
      this.postState$.take(1).subscribe(postState => {
        let postList = updateAndfilterUniqueItems(postState.list.concat(currentPostFromApi));
        this.postState$.next(Object.assign({}, postState, {
          currentPost: currentPostFromApi,
          list: postList
        }))
        return callback();
      })
    })
  }

  enableEditingPost(post) {
    this.postState$.take(1).subscribe(postState => {
      this.postState$.next(Object.assign({}, postState, {
        currentPost: Object.assign({}, postState.currentPost, {
          editing: true
        })
      }))
    })
  }

  likePost(data: {postId: string, userId: string}) {
    return this.http
      .post(API.posts + 'like', data, this.options)
      .map(res => res.json())
  }

  dislikePost(data: {postId: string, userId: string}) {
    return this.http
      .post(API.posts + 'dislike', data, this.options)
      .map(res => res.json())
  }

  getPostsByUserId(id: string) {
    return this.http.get(API.posts + `?user=${id}`, this.options)
      .map(res => res.json());
    /*return this.request({
      method: RequestMethod.Get,
      url: API.posts + `?user=${id}`
    })*/
  }

  // NGRX -----------------------------------------------------------

  ngrxGetPostById(ids) {
    return Observable.forkJoin(
      ids.map(id => {
        return this.getPost(id.id);
      })
    )
  }

  ngrxGetPostById2(ids) {
    return Observable.timer(800).mapTo(ids);
  }

  ngrxFindPostByUserId(userId: string) {
    return this.getPostsByUserId(userId);
  }

  // NGRX Selectors --------------------------------------------------

  ngrxSelectorGetPostsByIds(ids) {
    return this.store.map(store => {
      if (store.postState.postList.length == 0) {
        return store.postState.postList;
      }
      let mappedPosts = {};
      store.postState.postList.forEach(post => {
        mappedPosts[post.id] = post;
      })
      return ids.map(id => {
        if (mappedPosts[id.id]) {
          return mappedPosts[id.id];
        }
        return;
      }).filter(post => !!post)
    })
  }

  ngrxGetCurrentPostSelector() {
    return this.store.map(store => {
      return store.postState.postList.find(post => post.id === store.postState.currentPostId);
    })
  }

  ngrxGetUserPostsSelector(userId: string) {
    return this.store.map(store => {
      return store.postState.postList.filter(post => post.user.id === userId);
    })
  }



  // Selectors

  getPostsById(ids) {
    return this.postState$.map(postState => {
      console.log('postService.getPostsById');
      if (postState.list.length == 0) {
        return postState.list;
      }
      let mappedPosts = {};
      postState.list.forEach(post => {
        mappedPosts[post.id] = post;
      })
      return ids.map(id => {
        if (mappedPosts[id.id]) {
          return mappedPosts[id.id];
        }
        return;
      }).filter(post => !!post)

    })
  }

  getUserPosts(userId: string) {
    return this.postState$.map(postState => {
      if (postState.list.length) {
        return postState.list.filter(post => post.user.id === userId);
      }
    });
  }

  getCurrentPost() {
    return this.postState$.map(postState => postState.currentPost);
  }


  // Utilities

  checkPostState() {
    this.postState$.take(1).subscribe(postState => console.log(postState));
  }

}
