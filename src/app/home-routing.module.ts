import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/index';
import { wirelessComponent } from './components/wireless/index';
import { AuthGuard } from './services/auth-guard.service';
import { SamPasswordEyeComponent } from './components/password_eye/index';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivateChild: [AuthGuard],
        children: [{
            path: '',
            children: [
                { path: 'wireless', component: wirelessComponent },
            ]
        }]
    },
];

@NgModule({
    declarations: [
        HomeComponent,
        wirelessComponent,
        SamPasswordEyeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    providers: [
        AuthGuard,
    ],
})
export class HomeRoutingModule { }
