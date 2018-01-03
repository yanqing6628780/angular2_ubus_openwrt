import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
    imports: [
        HomeRoutingModule
    ],
    providers: [
        AuthGuard
    ],
})
export class HomeModule {}
