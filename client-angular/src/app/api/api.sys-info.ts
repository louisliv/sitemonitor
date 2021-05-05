import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemInfo } from "./../models/system-info.model";
import { environment } from 'src/environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class SystemInfoApi {

    constructor(private http: HttpClient) { }

    get() : Observable<SystemInfo>{
        var url = `${environment.apiUrl}/system-info/`;

        return this.http.get<SystemInfo>(url)
    }
}