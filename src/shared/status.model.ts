export class Status {
    public code: number;
    public detail: any;
    public loading: boolean;
    public notify: boolean;
    public ok: boolean;
    public text: string;

    constructor(data: any = {}) { // Accept an angular http Response
        this.code = data && (data.code || data.status);
        this.detail = data && data.detail;
        this.loading = data && data.hasOwnProperty('loading') ? data.loading : false;
        this.notify = data && data.hasOwnProperty('notify') ? data.notify : true;
        this.ok = data && data.hasOwnProperty('ok') ? data.ok : true;
        this.text = data && (data.text || data.statusText);
    }
}
