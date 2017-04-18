import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinctUntilChanged';
import { updateAndfilterUniqueItems } from '../shared/helpers';




@Injectable()
export class UserService implements OnInit {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  userState$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  userState: any;

  test: any;

  APIuser = 'http://localhost:8080/user';

  constructor(
    private http: Http,
    private store: Store<any>,
  ) {

  }

  ngOnInit() {
  }

  getUsers() {
    return this.http.get(this.APIuser)
            .map(res => {
              return res.json();
            });

  }

  initializingUserState() {
    let currentUser: any;
    let users: any[] = [];
    this.getUser(1).subscribe(user => {
      let userState = {
        list: users,
        currentUser: user,
        loading: false
      }
      this.userState$.next(userState);
    })
  }

  setCurrentUser(username, callback) {
    this.userState$.take(1).subscribe(userState => {
      let currentUser = userState.list.find(user => user.name === username);
      if (currentUser) {
        this.userState$.next(Object.assign({}, userState, {
          currentUser:  Object.assign({}, currentUser)
        }));
      } else {
      }
      return callback(currentUser);
    })
  }

  lougoutCurrentUser(callback) {
    this.userState$.take(1).subscribe(userState => {
      this.userState$.next(Object.assign({}, userState, {
        currentUser: null
      }));
      return callback(null);
    })
  }

  getUser(id){
    let url = `${this.APIuser}/${id}`;
    return this.http.get(url)
      .map(res => {
        return res.json();
      });

  }

  createUser(user) {
    console.log('createUser');
    return this.http
      .post(this.APIuser, user, this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  deleteUser(userID) {
    console.log('deleteUser');
    let url = `${this.APIuser}/${userID}`;

    return this.http
      .delete(url, this.options);
  }

  editUser(user) {
    console.log('editUser');
    let url = `${this.APIuser}/${user.id}`;

    return this.http
      .put(url, user, this.options)
      .map(res => res.json())
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return Observable.of(null);
  }

  addNewUser(user, callback) {
    this.createUser(user).subscribe(newUser => {
      this.userState$.take(1).subscribe(userState => {
        let users = userState.list.concat([user]);
        this.userState$.next(Object.assign({}, userState, {
          list: users
        }));
        return callback(newUser);
      })
    })
  }

  findUsersById(ids: any[], callback?: any) {
    //console.log(ids);
    //TODO utilizar el helper updateAndfilterUniqueItems como en slashService o forkJoin como en commentService
    for (var i = 0; i < ids.length; i++) {
      this.getUser(ids[i]).subscribe(userFromApi => {
        if (!userFromApi) {
          if (callback) {
            callback('USER_NOT_FOUND');
          }
          return;
        }
        this.userState$.take(1).subscribe(userState => {
          let users = userState.list;
          if (users.find(user => user.id === userFromApi.id)) {
            let newUsers = users.map(user => {
              if (user.id == userFromApi.id) {
                return userFromApi;
              }
              return user;
            });
            this.userState$.next(Object.assign({}, userState, {
              list: newUsers
            }))
            if (callback) {
              callback(null, userFromApi);
            }
          } else {
            users = users.concat(userFromApi);
            this.userState$.next(Object.assign({}, userState, {
              list: users
            }));
            if (callback) {
              callback(null, userFromApi);
            }
          }
        });
      });
    }
  }

  findUsersById2(ids) {
    Observable.forkJoin(
      ids.map(id => {
        return this.getUser(id);
      })
    ).take(1).subscribe(users => {
      this.userState$.take(1).subscribe(userState => {
        let userList = updateAndfilterUniqueItems(userState.list.concat(users));
        this.userState$.next(Object.assign({}, userState, {
          list: userList
        }))
      })
    })
  }

  erasingUser(id) {
    this.deleteUser(id).subscribe(() => {
      this.getUsers().subscribe(users => {
        this.userState$.take(1).subscribe(userState => {
          this.userState$.next(Object.assign({}, userState, {
            list: users
          }))
        })
      } )
    })
  }

  login(name: string, callback) {
    this.getUsers().subscribe(users => {
      let user = users.find(user => user.name === name);
      if (user) {
        this.findUsersById([user.id], (err, user) => {
          if (err) {
            console.log(err);
            return callback(err);
          }
          this.setCurrentUser(user.name, currentUser => console.log('setcurrentuser callback'))
          return callback(null, user);
        });
      } else {
        return callback('USER_NOT_FOUND');
      }
    })
  }

  // NGRX -----------------------------------------------------------


  ngrxFindUsersById(usersId: string[]) {
    return Observable.forkJoin(
      usersId.map(userId => {
        return this.getUser(userId);
      })
    );
  }

  ngrxLogin(username: string) {
    return this.getUsers().map(users => {
      let user = users.find(u => u.name === username);
      return user;
    })
  }

  ngrxGetCurrentUser() {
    return this.store.map(store => store.managerState.activeUser);
  }




  // NGRX Selectors --------------------------------------------------

  ngrxGetUsersById(usersId: string[]) {
    return this.store.map(store => {
      return store.userState.userList.map(user => {
        if (usersId.find(u => u == user.id)) {
          return user;
        }
      }).filter(user => !!user);
    })
  }

  ngrxGetUserById(id) {
    return this.store.map(store => {
      return store.userState.userList.find(user => user.id === id);
    })
  }






  // Selectors

  getCurrentUser(): Observable<any> {
    return this.userState$.map(userState => userState.currentUser);
  }

  getUsersList(): Observable<any> {
    return this.userState$.map(userState => {
      return userState.list;
    });
  }

  getUserById(id) {
    return this.userState$.map(userState =>
      userState.list.find(user => user.id === id)
    )
  }

  getUsersById(ids) {
    return this.userState$.map(userState => {
      if (!userState.list.length) {
        return userState.list;
      } else {
        let usersToShow: any[] = [];
        userState.list.map(user => {
          if (ids.find(id => id === user.id)) {
            usersToShow.push(user);
          }
        })
        return usersToShow;
      }
    })
  }


  // Utilities

  checkUserState() {
    this.userState$.subscribe(userState => {
      console.log(userState);
    })
  }



}
