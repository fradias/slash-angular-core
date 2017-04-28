import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { Slash } from '../slash/slash.model';
import { API } from '../environments/environment';



import { updateAndfilterUniqueItems } from '../shared/helpers';

@Injectable()
export class SlashService {
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  APIslashes = 'http://localhost:8080/slash';

  slashState$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private http: Http,
    private store: Store<any>,
    private route: ActivatedRoute,
  ){

  }

  initializingSlashState() {
    let slashes: any[] = [];
    let slashState = {
      list: slashes,
      currentSlash: undefined,
      loading: false
    }

    this.slashState$.next(slashState);
  }

  getSlashes(maxPosts?: number) {
    let max = '?max=';
    if (maxPosts) {
      max = `?max=${maxPosts}`;
    }

    return this.http.get(API.slashes + max)
            .map(res => res.json());
  }

  createSlash(slash) {
    return this.http
            .post(API.slashes + 'create/', slash, this.options)
            .map(res => res.json());
  }

  createPrivateSlash(data: {name: string, password: string, user: string}) {
    return this.http
            .post(API.slashes + 'createprivate', data, this.options)
            .map(res => res.json())
  }

  getSlash(id) {
    return this.http
            .get(API.slashes + `${id}`)
            .map(res => res.json());
  }

  getSlashByName(name: string) {
    return this.http.get(API.slashes + `?name=/${name}`)
            .map(res => res.json());
  }

  setCurrentSlash(currentSlash) {
    this.slashState$.take(1).subscribe(slashState => {
      if (slashState.list.find(s => s.id === currentSlash.id)) {
        let test = slashState.list.map(slash => {
          if (slash.id == currentSlash.id) {
            return currentSlash;
          }
          return slash;
        })
        this.slashState$.next(Object.assign({}, slashState, {
          currentSlash: currentSlash,
          list: test
        }))
      } else {
        let list = slashState.list.concat(currentSlash)
        this.slashState$.next(Object.assign({}, slashState, {
          currentSlash: currentSlash,
          list: list
        }))
      }
    })
  }

  setCurrentSlash2(slashName: string, callback: any) {
    this.getSlashes().subscribe(slashes => {
      let currentSlash = slashes.find(slash => slash.name === slashName);
      this.slashState$.take(1).subscribe(slashState => {
        if (slashState.list.find(s => s.id === currentSlash.id)) {
          let test = slashState.list.map(slash => {
            if (slash.id == currentSlash.id) {
              return currentSlash;
            }
            return slash;
          })
          this.slashState$.next(Object.assign({}, slashState, {
            currentSlash: currentSlash,
            list: test
          }))
          return callback();
        } else {
          let list = slashState.list.concat(currentSlash)
          this.slashState$.next(Object.assign({}, slashState, {
            currentSlash: currentSlash,
            list: list
          }))
          return callback();
        }
      })
    })
  }

  setCurrentSlash3(slashesNames, callback?:any) {
    Observable.forkJoin(
      slashesNames.map(name => {
        return this.getSlashByName(name);
      })
    ).subscribe(slashesFromApi => {
      let currentSlashes: any[] = [];
      slashesFromApi.forEach(slash => {
        if (!slash[0]) {
          return;
        }
        currentSlashes.push(slash[0]);
      })
      this.slashState$.take(1).subscribe(slashState => {
        let slashList = updateAndfilterUniqueItems(slashState.list.concat(currentSlashes));
        this.slashState$.next(Object.assign({}, slashState, {
          currentSlash: currentSlashes,
          list: slashList
        }))
      })
      if (callback) {
        return callback();
      }
    })
  }

  updateSlashState(currentSlash, callback:any,  slashName?:any,  newPostFromApi?:any) {
    if (!currentSlash) {
      Observable.forkJoin(
        newPostFromApi.slashes.map(slash => {
          return this.getSlash(slash.id)
        })
      ).subscribe((slashesFromApi: any[]) => {
        this.slashState$.take(1).subscribe(slashState => {
          let slashesList: any[];
          let currentSlash = slashesFromApi.find(s => s.name === `/${slashName}`);
          if (slashState.list[0]) {
            slashesList = updateAndfilterUniqueItems(slashState.list.concat(slashesFromApi));
          } else {
            slashesList = slashesFromApi;
          }
          this.slashState$.next(Object.assign({}, slashState, {
            currentSlash: currentSlash,
            list: slashesList
          }))
          return callback();
        })
      })
      //necesito el postFromApi para sacar los slashesId y con esos ids hago un forkJoin
      //con getSlash() y me traigo los slashes actualizados. y a su vez una vez q los tengo
      //busco q slash es el current con slashName find(s => s.name === `/${slashName}`);

    } else {
      this.getSlash(currentSlash.id).subscribe(currentSlashFromApi => {
        this.slashState$.take(1).subscribe(slashState => {
          let slashList = updateAndfilterUniqueItems(slashState.list.concat(currentSlashFromApi));
          this.slashState$.next(Object.assign({}, slashState, {
            currentSlash: currentSlashFromApi,
            list: slashList
          }))
          return callback();
        })
      })
    }
  }

  updateSlashState2(currentSlashes, callback) {
    Observable.forkJoin(
      currentSlashes.map(slash => {
        return this.getSlash(slash.id);
      })
    ).subscribe(currentSlashesFromApi => {
      this.slashState$.take(1).subscribe(slashState => {
        let slashList = updateAndfilterUniqueItems(slashState.list.concat(currentSlashesFromApi))
        this.slashState$.next(Object.assign({}, slashState, {
          currentSlash: currentSlashesFromApi,
          list: slashList
        }))
        return callback();
      })
    })
  }


  addSlashesToState() {
    this.getSlashes(10).subscribe(slashesFromApi => {
      if (!slashesFromApi) {
        return;
      }
      this.slashState$.take(1).subscribe(slashState => {
        let newSlashesList = updateAndfilterUniqueItems(slashState.list.concat(slashesFromApi));
        this.slashState$.next(Object.assign({}, slashState, {
          list: newSlashesList
        }))
      })
    });
  }

  creatingSlashes(newSlashes: any[], callback: any) {
    Observable.forkJoin(
      newSlashes.map(newSlash => {
        return this.createSlash(newSlash);
      })
    ).subscribe(newSlashesFromApi => {
      return callback(newSlashesFromApi);
    })
  }


  // NGRX -----------------------------------------------------------

  ngrxSetSlashes() { // no lo uso, uso directamente el pedido http
    return this.getSlashes(10).map((slashes: Slash[]) => slashes);
  }

  ngrxGetSlashesByName(names: string[]) {
    return Observable.forkJoin(
      names.map(name => {
        return this.getSlashByName(name);
      })
    ).map((responses: any[]) => responses.filter(res => !res.error))
  }

  ngrxCreateSlashes(slashesNames: any[]) {
    return Observable.forkJoin(
      slashesNames.map(name => {
        return this.createSlash(name);
      })
    )
  }

  ngrxGetSlashesById(ids: any[]) {
    return Observable.forkJoin(
      ids.map(id => {
        return this.getSlash(id.id);
      })
    )
  }








  // NGRX Selectors --------------------------------------------------

  ngrxGetAllSlashes() {
    return this.store.map(store => store.slashState.slashList);
  }

  ngrxGetCurrentSlashes() {
    return this.store.map(store => {
      return store.slashState.currentSlashesId.map(name => {
        return store.slashState.slashList.find(s => s.name === `/${name}`)
      }).filter(s => !!s);
    })
  }

  ngrxGetCurrentSlashes2(names) {
    return this.store.map(store => {
      return names.map(name => {
        return store.slashState.slashList.find(s => s.name === `/${name}`)
      }).filter(s => !!s);
    })
  }


  // Selectors

  getCurrentSlash() {
    return this.slashState$.map(slashState => {
      console.log('SELECTOR GetCurrentSlash()111111111111111111111111111111111111111');
      return slashState.currentSlash
    });
  }

  getAllSlashes() {
    return this.slashState$.map(slashState => slashState.list);
  }


  // Utilities

  checkSlashState() {
    this.slashState$.take(1).subscribe(slashState => console.log(slashState));
  }



}
