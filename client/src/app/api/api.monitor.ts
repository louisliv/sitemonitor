import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monitor } from "./../models/monitor.model";
import { environment } from 'src/environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class MonitorApi {

    constructor(private http: HttpClient) { }

    get() : Observable<Monitor>{
        return this.http.get<Monitor>(`${environment.apiUrl}/monitor/`)
    }
}