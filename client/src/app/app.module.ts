import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from "./login/login.module";
import { SystemInfoModule } from "./system-info/system-info.module";
import { SettingsModule } from './settings/settings.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ApiServicesModule } from './api/api.services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './api/api.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from "./services/auth.service";
import { ApiAuth } from "./api/api.auth";
import { ToastService } from "./services/toast.service";
import { ToastsComponent } from './services/toasts/toasts.component';

@NgModule({
  declarations: [
    AppComponent,
    ToastsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgbModule,
    NavbarModule,
    HomeModule,
    SettingsModule,
    SystemInfoModule,
    LoginModule,
    FontAwesomeModule,
    ApiServicesModule
  ],
  providers: [
    ApiAuth,
    ToastService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
