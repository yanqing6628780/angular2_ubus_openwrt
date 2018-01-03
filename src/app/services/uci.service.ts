import { UbusService } from './ubus.service';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class UciService extends UbusService {
    protected _object = 'uci'
    show(config) {
        let body = this.declareReqBody('get', {
            config: config
        })
        return this.httpPost(body)
    }
    set(config, sid, values) {
        let body = this.declareReqBody('set', {
            config: config,
            section: sid,
            values: values
        })
        return this.httpPost(body)
    }
}
