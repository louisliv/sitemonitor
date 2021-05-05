import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiLogin } from './api.login';
import { SettingsApi } from './api.settings';
import { MonitorApi } from "./api.monitor";
import { SystemInfoApi } from "./api.sys-info";

@NgModule({
    providers: [
        ApiLogin,
        SettingsApi,
        MonitorApi,
        SystemInfoApi
    ],
    declarations: [],
    imports: [HttpClientModule]
})
export class ApiServicesModule { }
