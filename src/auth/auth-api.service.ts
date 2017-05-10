import {Injectable} from '@angular/core';
import {Http, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthTokenStorageService} from './';
import {BaseApi} from '../shared';
import * as Environment from '../environment';

@Injectable()
export class AuthApiService extends BaseApi {

    // API_AUTH_URL = `${Environment.API_BASE_AUTH_URL}/auth`;
    API_AUTH_URL = `${Environment.API_URL.manager}/account/tokens`;

    constructor(authTokenStorageService: AuthTokenStorageService,
                http: Http) {
        super(authTokenStorageService, http);
    }

    login(token: string,
          tokenType: string = 'jwt',
          mobile_platform: string,
          mobile_version: string): Observable<any> {
        // TODO check tokenType if it's 'fat' or 'jwt'
        const body: any = {
            mobile_platform,
            mobile_version
        };
        if (tokenType === 'fat') {
            body.access_token = token;
        } else {
            body.token = token;
        }
        return this.request({
            body,
            method: RequestMethod.Post,
            url: `${this.API_AUTH_URL}`
        });
    }

    saveToken(token: string): Observable<any> {
        const body: any = {
            access_token: token
        };
        return this.request({
            body,
            method: RequestMethod.Post,
            url: `${this.API_AUTH_URL}`
        });
    }

}
