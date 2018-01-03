import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class UbusService  {
    protected apiUrl = '/ubus';  // URL to web api
    private ReqBody = {
        jsonrpc: '2.0',
        method: 'call',
        params: []
    }
    protected readonly UBUS_STATUS = [
        "Success",
        "Invalid command",
        "Invalid argument",
        "Method not found",
        "Not found",
        "No response",
        "Permission denied",
        "Request timed out",
        "Operation not supported",
        "Unknown error",
        "Connection failed"
    ]
    protected _object: string
    constructor(private http: Http, private _notification: NzNotificationService, private router: Router) { }
    protected declareReqBody(method, methodParams) {
        let opts = {
            object: this._object,
            method: method,
            params: methodParams
        }
        let params = Object.assign([], this.ReqBody.params)
        for(let x in opts) {
            params.push(opts[x])
        }
        let body = Object.assign({}, this.ReqBody);
        body.params = params
        return body
    }

    protected httpPost(body, options?) {
        let defaultOpts = { responseType: 'json' }
        options = options ? Object.assign(defaultOpts, options) : defaultOpts
        return this.http.post(this.apiUrl, body, options)
        .map(
            (data: any) => {
                if(data.error) {
                    throw (new Error(data.error.message))
                }
                const rs = data.result
                if (rs[0] != 0) {
                    throw(new Error(this.UBUS_STATUS[rs[0]]))
                } else {
                    return rs[1]
                }
            }
        )
        .catch((err: any) => {
            let errMsg = err.status ? `${err.status} - ${err.statusText}` : err.message ? err.message : 'Server error';
            let title = err.status > 200 ? '路由器出错' : '错误'
            this._notification.create('error', title, errMsg, { nzDuration: 8000 })
            return Observable.throw(new Error(errMsg));
        })
    }
}
