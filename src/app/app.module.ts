import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'

import { UbusInterceptor } from './ubus.interceptor';
import { SessionService } from './services/session.service';
import { UbusService } from './services/ubus.service'
import { FnService } from './services/fn.service';

import { HomeModule } from './home.module';

import { AppComponent } from './components/app.component'
import { AuthGuard } from './services/auth-guard.service';
import { UciService } from './services/uci.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HomeModule,
        AppRoutingModule,
    ],
    providers: [
        UbusService,
        UciService,
        SessionService,
        FnService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UbusInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
