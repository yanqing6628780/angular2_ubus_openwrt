import { SessionService } from './session.service';
import { FnService } from './fn.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private Fn: FnService, private session: SessionService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.session.redirectUrl = state.url
        const loginInfo = this.Fn.getUserSess()
        if (!loginInfo || !loginInfo.session) {
            this.router.navigate(['/auth'])
            return false
        }
        return this.session.access(loginInfo.session).toPromise()
        .then(data => {
            if (!data || !data.values || data.values.username !== 'root') {
                return false
            }
            return true
        }).catch(err => {
            this.router.navigate(['/auth'])
            return false
        })
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state)
    }
}
