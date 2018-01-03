import { UbusService } from './ubus.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class SessionService extends UbusService {
    private defaultToken = '00000000000000000000000000000000'
    private token = this.defaultToken
    protected _object = 'session'
    private _timeout = 3600
    redirectUrl: string
    login(username: string, password: string, timeout?: number) {
        this.token = this.defaultToken
        timeout = timeout ? timeout : this._timeout
        let body = this.declareReqBody(
            'login',
            { username: username, password: password, timeout: timeout }
        )
        return this.httpPost(body).map((data: any) => {
            if (data.ubus_rpc_session) {
                this.token = data.ubus_rpc_session
            }
            return data
        })
    }
    access(token) {
        this.token = token
        let body = this.declareReqBody('get', {})
        return this.httpPost(body)
    }
    getToken() {
        return this.token
    }
}
