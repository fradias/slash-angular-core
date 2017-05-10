import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthTokenStorageService {

    static STORAGE_KEY: string = 'jwt';

    constructor(
      private store: Store<any>
    ) {
    }

    getToken() {
        // return localStorage.getItem(AuthTokenStorageService.STORAGE_KEY);
        let token;
        this.store.take(1).subscribe(store => token = store.managerState.token);
        return token;
    }

    removeToken() {
        // localStorage.removeItem(AuthTokenStorageService.STORAGE_KEY);
    }

    setToken(token: string) {
        // localStorage.setItem(AuthTokenStorageService.STORAGE_KEY, token);
    }

    isTokenExpired(token: string): boolean {
        // console.log('compare timestamps: ' + Date.now() + ' and ' + this.getExpireTimestamp(token));
        // return (Date.now() > this.getExpireTimestamp(token));
        return false;
    }

    /*getExpireTimestamp(token: string): number {
     let tokenArr = token.split('.');
     let decodedMeta = Base64VLQFormat.decode(tokenArr[1]);
     let jsonMeta = JSON.parse(decodedMeta);
     return jsonMeta.exp * 1000;
     }*/


}
