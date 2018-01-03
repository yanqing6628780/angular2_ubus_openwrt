import { SessionService } from './services/session.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout'
import { Injector } from '@angular/core';

const defaultTimeout = 30000;

@Injectable()
export class UbusInterceptor implements HttpInterceptor {
    private _reqId = 1
    constructor(private injector: Injector) {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.url.indexOf('/ubus') === 0) {
            const sessionService = this.injector.get(SessionService)
            const timeout = Number(req.headers.get('timeout')) || defaultTimeout
            let body = Object.assign({}, req.body)
            let token = sessionService.getToken()
            body.params.unshift(token)
            body.id = this._reqId++
            const sessReq = req.clone({ body: body });
            return next.handle(sessReq).timeout(timeout)
        }
        return next.handle(req)
    }
}
