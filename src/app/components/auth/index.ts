import { FnService } from './../../services/fn.service';
import { SessionService } from './../../services/session.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    styleUrls: ['./index.css'],
    selector: 'auth',
    templateUrl: './index.html'
})
export class AuthComponent {
    username: string
    password: string
    constructor(private sessionService: SessionService, private router: Router, private Fn: FnService) {
        this.username = 'root'
        this.password = '12345678'
    }

    submitForm() {
        this.sessionService.login(this.username, this.password)
            .subscribe((data: any) => {
                const loginInfo = {
                    timeout: new Date().getTime() + 3600 * 1000,
                    session: data.ubus_rpc_session
                }
                this.Fn.setUserSess(loginInfo)
                let redirect = this.sessionService.redirectUrl ? this.sessionService.redirectUrl : 'wireless'
                this.router.navigate([redirect])
            })
    }
}
