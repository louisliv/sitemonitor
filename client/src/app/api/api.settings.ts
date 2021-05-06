import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setting } from "./../models/setting.model";
import { environment } from 'src/environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class SettingsApi {

    //http service requested (injection)
    constructor(private http: HttpClient) { }

    getAll(): Observable<Setting[]>
    {
        var url = `${environment.apiUrl}/system-settings/`

        return this.http.get<Setting[]>(url);
    }

    getTypes(): Observable<string[]>
    {
        var url = `${environment.apiUrl}/system-settings/types/`

        return this.http.get<string[]>(url);
    }

    create(newSetting: Setting): Observable<Setting>
    {
        var url = `${environment.apiUrl}/system-settings/`;

        return this.http.post<Setting>(url, newSetting)
    }

    update(updateSetting: Setting): Observable<Setting>
    {
        var url = `${environment.apiUrl}/system-settings/${updateSetting.id}/`;

        return this.http.put<Setting>(url, updateSetting)
    }

    destroy(destroySetting: Setting): Observable<any>
    {
        var url = `${environment.apiUrl}/system-settings/${destroySetting.id}/`;

        return this.http.delete<any>(url);
    }
}