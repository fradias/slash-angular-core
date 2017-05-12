import {Status} from "./status.model";
import {AuthTokenStorageService} from "../auth/auth-token.service";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {Http, Headers,Request, Response, URLSearchParams} from "@angular/http";

export abstract class BaseApi {

    constructor(protected authTokenStorageService: AuthTokenStorageService,
                protected http: Http) {
    }

    protected unauthorizedRequest(options: any = {}): Observable<any> {
        if (options.body) {
            if (typeof options.body !== 'string') {
                options.body = JSON.stringify(options.body);
            }

        }

        return this.http.request(new Request(options))
            .map((res: Response) => res.json());
    }

    /**
     * TODO Replace with authHttp (https://auth0.com/blog/2015/11/10/introducing-angular2-jwt-a-library-for-angular2-authentication/)
     */
    protected request(options: any = {}): Observable<any> {
        options.headers = new Headers();
        options.headers.append('Token', this.authTokenStorageService.getToken());
        console.log('REQUEST Base Api');
        console.log(options.body);
        options.headers.append('SlashToken', this.authTokenStorageService.getSlashToken(options.body.name))
        // options.headers.append('Authorization', 'Bearer ' + this.authTokenStorageService.getToken());

        if (options.queryParameter) {
            let params = new URLSearchParams();
            for (let query in options.queryParameter) {
                if (options.queryParameter.hasOwnProperty(query)) {
                    if (options.queryParameter[query] !== undefined) {
                        params.set(query, options.queryParameter[query]);
                    }
                }
            }
            options.params = params;
            delete options.queryParameter;
        }

        console.log('options');
        console.log(options);
        return this.http.request(new Request(options))
            .map(this.parseResponse)
            .catch(this.handleError);

    }

    private parseResponse(res: Response) {
        console.debug("BaseApi - Parse response", res);
        let parsedResponse: any;
        try {
            parsedResponse = res.json();
        } catch (exception) {
            parsedResponse = new Status({ok: false, text: 'Json parsing error', detail: exception});
        } finally {
            return parsedResponse;
        }
    }

    private handleError(error: Response | any) {
        console.error("BaseApi - Handle error", error);
        if (error instanceof Response) {
            return Observable.of(new Status(error));
        } else {
            let detail = error.message ? error.message : error.toString();
            return Observable.of(new Status({ok: false, text: 'Unknown http error', detail: detail}));
        }
    }

}
