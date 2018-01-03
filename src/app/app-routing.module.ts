import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthComponent} from './components/auth/index'

const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: '',
        loadChildren: 'app/home.module#HomeModule',
    }
];

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        FormsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    providers: [
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
